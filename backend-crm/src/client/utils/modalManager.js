/**
 * Dundee Movers CRM — Modal Manager Utility.
 * Manages modal lifecycles, DOM injection, and clean cleanup for Job Sheets, Invoices, and Phone Intake.
 */
import { renderJobSheetModal, initJobSheetModalEvents } from '../components/JobSheetModal.js';
import { renderInvoiceModal, initInvoiceModalEvents } from '../components/InvoiceModal.js';
import { renderNewLeadModal, initNewLeadModalEvents } from '../components/NewLeadModal.js';
import { renderLeadDetailsModal, initLeadDetailsModalEvents } from '../components/LeadDetailsModal.js';

export function openJobSheetModal(job, onSaveSignature) {
  if (!job) return;
  const modalWrap = document.createElement('div');
  modalWrap.innerHTML = renderJobSheetModal(job);
  document.body.appendChild(modalWrap);
  initJobSheetModalEvents(modalWrap, job, onSaveSignature);
}

export function openInvoiceModal(job, onSettleBalance) {
  if (!job) return;
  const modalWrap = document.createElement('div');
  modalWrap.innerHTML = renderInvoiceModal(job);
  document.body.appendChild(modalWrap);
  initInvoiceModalEvents(modalWrap, job, onSettleBalance);
}

export function openNewLeadModal(callbacks = {}) {
  const modalWrap = document.createElement('div');
  modalWrap.innerHTML = renderNewLeadModal();
  document.body.appendChild(modalWrap);
  initNewLeadModalEvents(modalWrap, callbacks);
}

export function openLeadSurveyModal(lead, onSendPassWithPrice, onSavePrice) {
  if (!lead) return;
  const modalWrap = document.createElement('div');
  modalWrap.innerHTML = renderLeadDetailsModal(lead);
  document.body.appendChild(modalWrap);
  initLeadDetailsModalEvents(modalWrap, lead, onSendPassWithPrice, onSavePrice);
}
