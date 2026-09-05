import './styles/main.css';
import { initCustomCursor } from './components/Cursor.js';
import { initSmoothScroll } from './utils/smoothScroll.js';
import { renderNavigation } from './components/Navigation.js';
import { renderHero3D } from './components/Hero3D.js';
import { renderFeaturedStory } from './components/FeaturedStory.js';
import { renderStoryCards3D } from './components/StoryCards3D.js';
import { renderStoriesHero } from './components/StoriesHero.js';
import { renderLatestStories } from './components/LatestStories.js';
import { renderHorizontalScroll } from './components/HorizontalScroll.js';
import { renderIssue3D } from './components/Issue3D.js';
import { renderLatestIssueHero } from './components/LatestIssueHero.js';
import { renderArticleView } from './components/ArticleView.js';
import { renderCategoryView } from './components/CategoryView.js';
import { renderArchiveView } from './components/ArchiveView.js';
import { renderAboutView } from './components/AboutView.js';
import { renderSearchOverlay } from './components/SearchOverlay.js';
import { renderFooter } from './components/Footer.js';

// Application State
const state = {
  currentView: 'home',
  selectedCategory: 'CULTURE',
  activeArticleId: null,
  savedArticleIds: JSON.parse(localStorage.getItem('vanta_saved_articles') || '[]')
};

// Toast Notification Helper
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-gold);">★</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Save / Bookmark Toggle
function toggleBookmark(articleId) {
  const idx = state.savedArticleIds.indexOf(articleId);
  if (idx > -1) {
    state.savedArticleIds.splice(idx, 1);
  } else {
    state.savedArticleIds.push(articleId);
  }
  localStorage.setItem('vanta_saved_articles', JSON.stringify(state.savedArticleIds));
  updateNavigation();
}

function isBookmarked(articleId) {
  return state.savedArticleIds.includes(articleId);
}

// Navigation Coordinator
function updateNavigation() {
  renderNavigation(
    state.currentView,
    state.savedArticleIds.length,
    navigateTo,
    openSearchOverlay
  );
}

function openSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.add('open');
    const input = overlay.querySelector('#vanta-search-input');
    if (input) input.focus();
  }
}

// Master View Router
function navigateTo(view, options = {}) {
  state.currentView = view;
  if (options.category) state.selectedCategory = options.category;
  if (options.articleId) state.activeArticleId = options.articleId;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  updateNavigation();

  const appEl = document.getElementById('app');
  if (!appEl) return;

  // Clear reading progress bar if not in article view
  const progressBar = document.getElementById('reading-progress-bar');
  if (progressBar && view !== 'article') {
    progressBar.style.width = '0%';
  }

  if (view === 'home') {
    appEl.innerHTML = `
      <div id="hero-section-mount"></div>
      <div id="featured-story-mount"></div>
      <div id="story-cards-mount"></div>
      <div id="horizontal-scroll-mount"></div>
      <div id="issue-3d-mount"></div>
    `;

    renderHero3D(appEl.querySelector('#hero-section-mount'), navigateTo);
    renderFeaturedStory(appEl.querySelector('#featured-story-mount'), (artId) => navigateTo('article', { articleId: artId }));
    renderStoryCards3D(appEl.querySelector('#story-cards-mount'), (artId) => navigateTo('article', { articleId: artId }), toggleBookmark, isBookmarked);
    renderHorizontalScroll(appEl.querySelector('#horizontal-scroll-mount'), (artId) => navigateTo('article', { articleId: artId }));
    renderIssue3D(appEl.querySelector('#issue-3d-mount'), navigateTo);

  } else if (view === 'stories') {
    appEl.innerHTML = `
      <div id="stories-hero-mount"></div>
      <div id="latest-stories-mount"></div>
    `;
    renderStoriesHero(appEl.querySelector('#stories-hero-mount'), navigateTo);
    renderLatestStories(appEl.querySelector('#latest-stories-mount'), (artId) => navigateTo('article', { articleId: artId }), 'ALL');

  } else if (view === 'article') {
    renderArticleView(appEl, state.activeArticleId, navigateTo, toggleBookmark, isBookmarked, showToast);

  } else if (view === 'category') {
    renderCategoryView(appEl, state.selectedCategory, (artId) => navigateTo('article', { articleId: artId }));

  } else if (view === 'issue') {
    appEl.innerHTML = `
      <div id="issue-hero-mount"></div>
      <div id="issue-3d-mount"></div>
    `;
    renderLatestIssueHero(appEl.querySelector('#issue-hero-mount'), navigateTo, showToast);
    renderIssue3D(appEl.querySelector('#issue-3d-mount'), navigateTo);

  } else if (view === 'archive') {
    renderArchiveView(appEl, navigateTo, showToast);

  } else if (view === 'about') {
    renderAboutView(appEl);
  }
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCustomCursor();
  renderSearchOverlay(navigateTo);
  renderFooter(navigateTo, showToast);
  navigateTo('home');
});
