export const API_BASE = 'http://localhost:5000/api';

// --- Token Management ---
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function setToken(token: string): void {
  localStorage.setItem('admin_token', token);
}

export function removeToken(): void {
  localStorage.removeItem('admin_token');
}

export function getAdminInfo(): { id: string; name: string; email: string } | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('admin_info');
  return data ? JSON.parse(data) : null;
}

export function setAdminInfo(admin: { id: string; name: string; email: string }): void {
  localStorage.setItem('admin_info', JSON.stringify(admin));
}

export function removeAdminInfo(): void {
  localStorage.removeItem('admin_info');
}

// --- HTTP Helpers ---
async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  return fetch(url, { ...options, headers });
}

// --- Auth ---
export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login gagal');
  return data;
}

export async function logoutAdmin() {
  const res = await authFetch(`${API_BASE}/admin/logout`, { method: 'POST' });
  removeToken();
  removeAdminInfo();
  return res.json();
}

// --- Registrations ---
export async function getRegistrations(params: {
  page?: number;
  limit?: number;
  status?: string;
  level?: string;
  keyword?: string;
} = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.status) query.set('status', params.status);
  if (params.level) query.set('level', params.level);
  if (params.keyword) query.set('keyword', params.keyword);

  const res = await authFetch(`${API_BASE}/admin/registrations?${query.toString()}`);
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengambil data');
  return data;
}

export async function getRegistrationDetail(id: string) {
  const res = await authFetch(`${API_BASE}/admin/registrations/${id}`);
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengambil detail');
  return data;
}

export async function updateRegistrationStatus(id: string, status: string, adminNote?: string) {
  const res = await authFetch(`${API_BASE}/admin/registrations/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, admin_note: adminNote }),
  });
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal update status');
  return data;
}

// --- Documents ---
export async function verifyDocument(id: string, verificationStatus: string, adminNote?: string) {
  const res = await authFetch(`${API_BASE}/admin/documents/${id}/verify`, {
    method: 'PUT',
    body: JSON.stringify({ verification_status: verificationStatus, admin_note: adminNote }),
  });
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal verifikasi dokumen');
  return data;
}

export async function downloadDocument(id: string): Promise<Blob> {
  const res = await authFetch(`${API_BASE}/admin/documents/${id}/download`);
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  if (!res.ok) throw new Error('Gagal download dokumen');
  return res.blob();
}

// --- Payments ---
export async function verifyPayment(id: string, paymentStatus: string, adminNote?: string) {
  const res = await authFetch(`${API_BASE}/admin/payments/${id}/verify`, {
    method: 'PUT',
    body: JSON.stringify({ payment_status: paymentStatus, admin_note: adminNote }),
  });
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal verifikasi pembayaran');
  return data;
}

// --- Export ---
export async function exportRegistrations(params: {
  status?: string;
  level?: string;
  startDate?: string;
  endDate?: string;
} = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.level) query.set('level', params.level);
  if (params.startDate) query.set('start_date', params.startDate);
  if (params.endDate) query.set('end_date', params.endDate);

  const res = await authFetch(`${API_BASE}/admin/export/registrations?${query.toString()}`);
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  if (!res.ok) throw new Error('Gagal export data');
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data-pendaftar-psb.xlsx';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// --- Public / Calon Santri ---
export async function submitPublicRegistration(formData: FormData) {
  // Use generic fetch, no JSON content-type since it's FormData
  const res = await fetch(`${API_BASE}/registrations`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengirim pendaftaran');
  return data;
}

export async function checkRegistrationStatus(registrationNumber: string, accessCode: string) {
  const query = new URLSearchParams({
    registration_number: registrationNumber,
    access_code: accessCode,
  });
  const res = await fetch(`${API_BASE}/registrations/check-status?${query.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Data pendaftaran tidak ditemukan');
  return data;
}
