const API_BASE = '/api';

export function getAuthHeaders() {
  const token = localStorage.getItem('stackyr_admin_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchBrands(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/brands${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
}

export async function fetchBrandById(id) {
  const res = await fetch(`${API_BASE}/brands/${id}`);
  if (!res.ok) throw new Error('Failed to fetch brand details');
  return res.json();
}

export async function createBrand(brandData, isFormData = false) {
  const headers = getAuthHeaders();
  let body = brandData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(brandData);
  }

  const res = await fetch(`${API_BASE}/brands`, {
    method: 'POST',
    headers,
    body
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create brand');
  }
  return res.json();
}

export async function updateBrand(id, brandData, isFormData = false) {
  const headers = getAuthHeaders();
  let body = brandData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(brandData);
  }

  const res = await fetch(`${API_BASE}/brands/${id}`, {
    method: 'PUT',
    headers,
    body
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update brand');
  }
  return res.json();
}

export async function deleteBrand(id) {
  const res = await fetch(`${API_BASE}/brands/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete brand');
  return res.json();
}

export async function reorderBrands(orderList) {
  const res = await fetch(`${API_BASE}/brands/reorder`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ orderList })
  });
  if (!res.ok) throw new Error('Failed to reorder brands');
  return res.json();
}

export async function fetchContent() {
  const res = await fetch(`${API_BASE}/content`);
  if (!res.ok) throw new Error('Failed to fetch site content');
  return res.json();
}

export async function updateContent(contentData) {
  const res = await fetch(`${API_BASE}/content`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contentData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update content');
  }
  return res.json();
}

export async function submitInquiry(data) {
  const res = await fetch(`${API_BASE}/content/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to submit inquiry');
  }
  return res.json();
}

export async function fetchInquiries() {
  const res = await fetch(`${API_BASE}/content/inquiries`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch inquiries');
  return res.json();
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function uploadAsset(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'File upload failed');
  }
  return res.json();
}

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid login credentials');
  }
  return res.json();
}

export async function fetchMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to get current user');
  return res.json();
}
