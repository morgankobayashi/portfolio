import React, { useEffect, useMemo, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";
import { archiveCategories, archiveVideos } from "../data/archiveVideos.js";
import styles from "./KobayashiArchives.module.css";

const TAB_HEIGHT = 55;
const STACK_STEP = 32;
const OPEN_HEIGHT = 360;
const EMPTY_CANVAS_HEIGHT = 260;
const CANVAS_PADDING = 54;
const STACK_START = 50;
const LIP_OFFSETS = [2, 14, 30, 50, 66];
const YEAR_FOLDER_SHADES = ["#dfe6ee", "#d4dfea", "#e5ebf2", "#ccd8e5"];
const RESTRICTED_CATEGORY_ID = "restricted";
const VAULT_PIN = "6767";
// Tweak only these three values for mode-switch feel.
// MODE_REPLACE_LAG_MS: 0 means incoming starts immediately with outgoing.
// MODE_SWITCH_MS: duration of each folder's slide.
// MODE_STAGGER_MS: delay between folder rows.
const MODE_STAGGER_MS = 100;
const MODE_SWITCH_MS = 400;
const MODE_REPLACE_LAG_MS = 0;
const TOP_SCROLL_ZONE = 220;
const SCROLL_DAMPING = 0.62;

function buildFoldersByCategory(videos, categories) {
  return categories
    .map((category) => ({
      ...category,
      items: videos.filter((video) => video.categoryId === category.id),
    }))
    .filter((category) => category.items.length > 0);
}

function buildFoldersByYear(videos) {
  const years = [...new Set(videos.map((video) => video.year))].sort((a, b) => b - a);

  return years.map((year) => ({
    id: `year-${year}`,
    label: String(year),
    items: videos.filter((video) => video.year === year),
  }));
}

export default function KobayashiArchives() {
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [groupMode, setGroupMode] = useState("categories");
  const [toggleMode, setToggleMode] = useState("categories");
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [vaultOpen, setVaultOpen] = useState(false);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultPin, setVaultPin] = useState("");
  const [vaultError, setVaultError] = useState("");
  const [lightboxVideo, setLightboxVideo] = useState(null);
  const [stackViewportHeight, setStackViewportHeight] = useState(0);
  const [stackScrollTop, setStackScrollTop] = useState(0);
  const [outgoingFolders, setOutgoingFolders] = useState([]);
  const [outgoingShades, setOutgoingShades] = useState([]);
  const timersRef = useRef([]);
  const vaultPinInputRef = useRef(null);
  const stackFrameRef = useRef(null);

  const toggleFilterValue = (value) => {
    if (groupMode === "categories") {
      setSelectedYears((currentYears) =>
        currentYears.includes(value) ? currentYears.filter((year) => year !== value) : [...currentYears, value],
      );
      return;
    }

    setSelectedCategories((currentCategories) =>
      currentCategories.includes(value)
        ? currentCategories.filter((categoryId) => categoryId !== value)
        : [...currentCategories, value],
    );
  };

  const clearSwitchTimers = () => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearSwitchTimers();
  }, []);

  useEffect(() => {
    if (!vaultOpen || vaultUnlocked) return;
    vaultPinInputRef.current?.focus();
  }, [vaultOpen, vaultUnlocked]);

  useEffect(() => {
    if (!lightboxVideo) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxVideo(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxVideo]);

  useEffect(() => {
    const updateStackViewport = () => {
      const nextHeight = stackFrameRef.current?.clientHeight || 0;
      setStackViewportHeight(nextHeight);
    };

    updateStackViewport();
    window.addEventListener("resize", updateStackViewport);

    const resizeObserver = new ResizeObserver(updateStackViewport);
    if (stackFrameRef.current) {
      resizeObserver.observe(stackFrameRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateStackViewport);
      resizeObserver.disconnect();
    };
  }, []);

  const sortedVideos = useMemo(() => [...archiveVideos].sort((a, b) => b.year - a.year), []);

  const restrictedVideos = useMemo(
    () => sortedVideos.filter((video) => video.categoryId === RESTRICTED_CATEGORY_ID),
    [sortedVideos],
  );

  const publicVideos = useMemo(
    () => sortedVideos.filter((video) => video.categoryId !== RESTRICTED_CATEGORY_ID),
    [sortedVideos],
  );

  const publicCategories = useMemo(
    () => archiveCategories.filter((category) => category.id !== RESTRICTED_CATEGORY_ID),
    [],
  );

  const availableYears = useMemo(
    () => [...new Set(publicVideos.map((video) => String(video.year)))].sort((left, right) => Number(right) - Number(left)),
    [publicVideos],
  );

  const availableCategories = useMemo(() => publicCategories, [publicCategories]);

  const filteredVideos = useMemo(() => {
    if (groupMode === "categories") {
      if (selectedYears.length === 0) return publicVideos;
      return publicVideos.filter((video) => selectedYears.includes(String(video.year)));
    }

    if (selectedCategories.length === 0) return publicVideos;
    return publicVideos.filter((video) => selectedCategories.includes(video.categoryId));
  }, [groupMode, selectedCategories, selectedYears, publicVideos]);

  const foldersByMode = useMemo(
    () => ({
      categories: buildFoldersByCategory(filteredVideos, publicCategories),
      years: buildFoldersByYear(filteredVideos),
    }),
    [filteredVideos, publicCategories],
  );

  const folders = foldersByMode[groupMode] || [];
  const categoryFolderShades = publicCategories.map((category) => category.color);
  const folderShades = groupMode === "categories" ? categoryFolderShades : YEAR_FOLDER_SHADES;

  const selectedCategoryId =
    folders.some((folder) => folder.id === activeCategoryId) ? activeCategoryId : "";

  const activeIndex = folders.findIndex((folder) => folder.id === selectedCategoryId);

  const getCanvasHeightFor = (list, openIndex) => {
    const closedHeight = STACK_START + list.length * STACK_STEP + TAB_HEIGHT + CANVAS_PADDING;
    if (!list.length) return EMPTY_CANVAS_HEIGHT;
    if (openIndex < 0) return closedHeight;
    return closedHeight + OPEN_HEIGHT;
  };

  const canvasHeight = getCanvasHeightFor(folders, activeIndex);
  const renderedCanvasHeight = Math.max(canvasHeight, stackViewportHeight || 0);
  const categoriesAccent = categoryFolderShades[0] || "#d8ead0";
  const yearsAccent = YEAR_FOLDER_SHADES[0];
  const filterOptions = groupMode === "categories" ? availableYears : availableCategories;
  const filterLabel = groupMode === "categories" ? "Filter by year" : "Filter by category";
  const activeFilterValues = groupMode === "categories" ? selectedYears : selectedCategories;

  const submitVaultPin = (event) => {
    event.preventDefault();
    if (vaultPin === VAULT_PIN) {
      setVaultUnlocked(true);
      setVaultError("");
      return;
    }

    setVaultError("Incorrect PIN.");
  };

  const openVideoLightbox = (video) => {
    if (!video?.sourceId) return;
    setLightboxVideo(video);
  };

  const closeVideoLightbox = () => {
    setLightboxVideo(null);
  };

  const lightboxEmbedUrl =
    lightboxVideo?.sourceId
      ? `https://www.youtube.com/embed/${lightboxVideo.sourceId}?autoplay=1&rel=0&modestbranding=1`
      : "";

  const onVaultPinChange = (nextValue) => {
    const normalized = String(nextValue || "").replace(/\D/g, "").slice(0, 4);
    setVaultPin(normalized);
    setVaultError("");
  };

  const switchGrouping = (nextMode) => {
    setToggleMode(nextMode);
    if (nextMode === groupMode || transitionPhase !== "idle") return;

    clearSwitchTimers();
    const currentFolders = folders;
    const currentShades = folderShades;
    const nextFolders = foldersByMode[nextMode] || [];

    setOutgoingFolders(currentFolders);
    setOutgoingShades(currentShades);
    setActiveCategoryId("");
    setTransitionPhase("swap");

    const switchTimer = window.setTimeout(() => {
      setGroupMode(nextMode);
    }, MODE_REPLACE_LAG_MS);

    const outWait = MODE_SWITCH_MS + Math.max(0, currentFolders.length - 1) * MODE_STAGGER_MS;
    const inWait = MODE_REPLACE_LAG_MS + MODE_SWITCH_MS + Math.max(0, nextFolders.length - 1) * MODE_STAGGER_MS;
    const settleTimer = window.setTimeout(() => {
      setTransitionPhase("idle");
      setOutgoingFolders([]);
      setOutgoingShades([]);
    }, Math.max(outWait, inWait));

    timersRef.current.push(switchTimer);
    timersRef.current.push(settleTimer);
  };

  const getTopScrollFx = (topPosition) => {
    const viewportY = topPosition - stackScrollTop;
    const progress = Math.max(0, Math.min(1, (STACK_START - viewportY) / TOP_SCROLL_ZONE));
    const sinkPx = 46 * progress * progress;
    const folderScale = 1 - 0.24 * progress;
    const lipScale = 1 - 0.14 * progress;
    const zDrop = 520 * progress;
    const folderClipTop = 64 * progress * progress;
    const lipClipTop = 30 * progress * progress;
    const isBehind = progress > 0.02;

    return {
      progress,
      isBehind,
      zDrop,
      "--scroll-offset": `${sinkPx}px`,
      "--scroll-folder-scale": `${folderScale}`,
      "--scroll-lip-scale": `${lipScale}`,
      "--scroll-clip-folder": `${folderClipTop}px`,
      "--scroll-clip-lip": `${lipClipTop}px`,
    };
  };

  const onStackScroll = (event) => {
    setStackScrollTop(event.currentTarget.scrollTop);
  };

  const onStackWheel = (event) => {
    const frame = stackFrameRef.current;
    if (!frame) return;

    event.preventDefault();
    frame.scrollTop += event.deltaY * SCROLL_DAMPING;
  };

  const renderStackLayer = (list, shades, layerClass = "") => {

    return (
      <div className={`${styles.stackLayer} ${layerClass}`}>
        {list.map((folder, index) => {
          const isActive = folder.id === selectedCategoryId;
          const isAfterActive = activeIndex >= 0 && index > activeIndex;
          const top = STACK_START + index * STACK_STEP + (isAfterActive ? OPEN_HEIGHT : 0);
          const { zDrop: folderZDrop, isBehind: folderBehind, ...folderMotionStyle } = getTopScrollFx(top);

          return (
            <section
              key={folder.id}
              className={`${styles.folder} ${isActive ? styles.folderActive : ""}`}
              style={{
                top: `${top}px`,
                zIndex: folderBehind ? -220 + index - folderZDrop : 20 + index,
                "--folder-index": index,
                "--folder-shade": shades[index % shades.length],
                ...folderMotionStyle,
              }}
              onClick={() => {
                if (transitionPhase !== "idle") return;
                setActiveCategoryId((prev) => (prev === folder.id ? "" : folder.id));
              }}
            >
              <div className={styles.folderTopEdge} aria-hidden="true" />

              <div className={styles.folderBody}>
                <div className={styles.thumbGrid}>
                  {folder.items.map((video) => (
                    <article key={video.id} className={styles.thumbCard}>
                      <button
                        type="button"
                        className={styles.thumbButton}
                        onClick={(event) => {
                          event.stopPropagation();
                          openVideoLightbox(video);
                        }}
                        aria-label={`Open ${video.title}`}
                      >
                        <img
                          src={video.thumbnail}
                          alt={`${video.title} thumbnail`}
                          onError={(event) => {
                            event.currentTarget.src = "/thumbnails/highlands.jpg";
                          }}
                        />
                        <h3>{video.title}</h3>
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {list.length > 0 && (
          (() => {
            const tailTop = STACK_START + list.length * STACK_STEP + (activeIndex >= 0 ? OPEN_HEIGHT : 0);
            const tailHeight = Math.max(TAB_HEIGHT, renderedCanvasHeight - tailTop);
            const tailLipTop = Math.max(10, tailTop - 38);
            const tailLipLeft = `${LIP_OFFSETS[list.length % LIP_OFFSETS.length]}%`;
            const { zDrop: tailZDrop, isBehind: tailBehind, ...tailMotionStyle } = getTopScrollFx(tailTop);

            return (
              <>
                <section
                  className={`${styles.folder} ${styles.folderTail}`}
                  style={{
                    top: `${tailTop}px`,
                    height: `${tailHeight}px`,
                    zIndex: tailBehind ? -240 + list.length - tailZDrop : 19 + list.length,
                    "--folder-index": list.length + 1,
                    "--folder-shade": shades[Math.max(0, list.length - 1) % shades.length],
                    ...tailMotionStyle,
                  }}
                  aria-hidden="true"
                >
                  <div className={styles.folderTopEdge} />
                  <div className={styles.folderBody} />
                </section>

                <div
                  className={`${styles.folderLip} ${styles.folderLipTail}`}
                  style={{
                    top: `${tailLipTop}px`,
                    left: tailLipLeft,
                    zIndex: tailBehind ? 8 + list.length : 900 + list.length,
                    "--folder-index": list.length + 1,
                    "--folder-shade": shades[Math.max(0, list.length - 1) % shades.length],
                    ...tailMotionStyle,
                  }}
                  aria-hidden="true"
                />
              </>
            );
          })()
        )}

        {list.map((folder, index) => {
          const isActive = folder.id === selectedCategoryId;
          const isAfterActive = activeIndex >= 0 && index > activeIndex;
          const top = STACK_START + index * STACK_STEP + (isAfterActive ? OPEN_HEIGHT : 0);
          const lipTop = Math.max(10, top - 38 + (isActive ? -10 : 0));
          const { zDrop: lipZDrop, isBehind: lipBehind, ...lipMotionStyle } = getTopScrollFx(top);

          return (
            <button
              key={`lip-${folder.id}`}
              type="button"
              className={styles.folderLip}
              style={{
                top: `${lipTop}px`,
                left: `${LIP_OFFSETS[index % LIP_OFFSETS.length]}%`,
                zIndex: lipBehind ? 12 + index : 400 + index,
                "--folder-index": index,
                "--folder-shade": shades[index % shades.length],
                ...lipMotionStyle,
              }}
              onClick={() => {
                if (transitionPhase !== "idle") return;
                setActiveCategoryId((prev) => (prev === folder.id ? "" : folder.id));
              }}
            >
              <span>{folder.label}</span>
              <strong>{folder.items.length}</strong>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.archiveRoot}>
      <Seo
        title="Kobayashi Archives"
        description="Stacked file-drawer archive for video case files."
        robots="noindex,nofollow"
      />

      <section className={styles.stage}>
        <header className={styles.topBar}>
          <div
            className={styles.modeToggleRow}
            style={{
              "--toggle-bg": toggleMode === "categories" ? categoriesAccent : yearsAccent,
            }}
          >
            <span className={`${styles.modeToggleLabel} ${toggleMode === "categories" ? styles.modeToggleLabelActive : ""}`}>
              Categories
            </span>

            <label className={styles.modeToggleControl}>
              <input
                type="checkbox"
                checked={toggleMode === "years"}
                onChange={(event) => switchGrouping(event.target.checked ? "years" : "categories")}
                aria-label="Toggle archive grouping"
              />
              <span className={styles.modeToggleTrack} aria-hidden="true">
                <span className={styles.modeToggleKnob} />
              </span>
            </label>

            <span className={`${styles.modeToggleLabel} ${toggleMode === "years" ? styles.modeToggleLabelActive : ""}`}>
              Years
            </span>
          </div>
        </header>

        <div className={styles.filterBar} aria-label={filterLabel}>
          {filterOptions.map((option) => {
            const value = groupMode === "categories" ? option : option.id;
            const label = groupMode === "categories" ? option : option.label;
            const checked = activeFilterValues.includes(String(value));

            return (
              <label key={value} className={`${styles.filterChip} ${checked ? styles.filterChipActive : ""}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFilterValue(String(value))}
                />
                <span className={styles.filterBox} aria-hidden="true" />
                <span className={styles.filterLabel}>{label}</span>
              </label>
            );
          })}
        </div>

        <div
          className={styles.stackFrame}
          ref={stackFrameRef}
          onScroll={onStackScroll}
          onWheel={onStackWheel}
        >
          {folders.length === 0 && (
            <div className={styles.emptyState}>
              {activeFilterValues.length > 0 ? "No videos match the selected filters." : "No folders available."}
            </div>
          )}

          {folders.length > 0 && (
            <div
              className={styles.stackCanvas}
              style={{
                height: `${renderedCanvasHeight}px`,
                "--switch-duration": `${MODE_SWITCH_MS}ms`,
                "--switch-stagger": `${MODE_STAGGER_MS}ms`,
              }}
            >
              {transitionPhase === "swap" && outgoingFolders.length > 0 &&
                renderStackLayer(outgoingFolders, outgoingShades, styles.stackCanvasOut)}

              {renderStackLayer(folders, folderShades, transitionPhase === "swap" ? styles.stackCanvasIn : "")}
            </div>
          )}
        </div>

        {restrictedVideos.length > 0 && (
          <div className={styles.vaultDock}>
            <button
              type="button"
              className={styles.vaultHandle}
              onClick={() => setVaultOpen(true)}
            >
              <span>Restricted Vault</span>
              <strong>{restrictedVideos.length}</strong>
            </button>
          </div>
        )}
      </section>

      {restrictedVideos.length > 0 && (
        <div
          className={`${styles.vaultOverlay} ${vaultOpen ? styles.vaultOverlayOpen : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Restricted vault"
        >
          <div className={styles.vaultPanel}>
            <header className={styles.vaultHeader}>
              <h2>Restricted Vault</h2>
              <button
                type="button"
                className={styles.vaultClose}
                onClick={() => {
                  setVaultOpen(false);
                  setVaultPin("");
                  setVaultError("");
                }}
              >
                Close
              </button>
            </header>

            {!vaultUnlocked && (
              <form className={styles.vaultForm} onSubmit={submitVaultPin}>
                <label htmlFor="vault-pin">Enter PIN</label>
                <div className={styles.vaultPinBoxes} onClick={() => vaultPinInputRef.current?.focus()}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      key={`pin-box-${index}`}
                      className={`${styles.vaultPinBox} ${vaultPin.length > index ? styles.vaultPinBoxFilled : ""}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <input
                  id="vault-pin"
                  ref={vaultPinInputRef}
                  type="password"
                  inputMode="numeric"
                  value={vaultPin}
                  onChange={(event) => onVaultPinChange(event.target.value)}
                  maxLength={4}
                  autoComplete="off"
                  className={styles.vaultPinInput}
                />
                <button type="submit">Unlock</button>
                {vaultError && <p>{vaultError}</p>}
              </form>
            )}

            {vaultUnlocked && (
              <div className={styles.vaultGrid}>
                {restrictedVideos.map((video) => (
                  <article key={`vault-${video.id}`} className={styles.thumbCard}>
                    <button
                      type="button"
                      className={styles.thumbButton}
                      onClick={() => openVideoLightbox(video)}
                      aria-label={`Open ${video.title}`}
                    >
                      <img
                        src={video.thumbnail}
                        alt={`${video.title} thumbnail`}
                        onError={(event) => {
                          event.currentTarget.src = "/thumbnails/highlands.jpg";
                        }}
                      />
                      <h3>{video.title}</h3>
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {lightboxVideo && (
        <div
          className={styles.videoLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxVideo.title} video player`}
          onClick={closeVideoLightbox}
        >
          <div className={styles.videoLightboxPanel} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.videoLightboxClose}
              onClick={closeVideoLightbox}
            >
              Close
            </button>
            <div className={styles.videoLightboxFrame}>
              <iframe
                src={lightboxEmbedUrl}
                title={lightboxVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
