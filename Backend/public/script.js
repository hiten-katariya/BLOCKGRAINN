/* Firebase Connected Backend - Data fetched from API */
const API_BASE = '/api';

async function fetchAllData() {
  try {
    const res = await fetch(`${API_BASE}/db`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    showToast('Failed to fetch data from server', 'error');
    return null;
  }
}

async function addStockToFirebase(godownId, grain, quantity) {
  try {
    const res = await fetch(`${API_BASE}/add-stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ godownId, grain, quantity: parseInt(quantity) })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error adding stock:', error);
    showToast('Failed to add stock', 'error');
    return null;
  }
}

async function dispatchToFirebase(fromId, toId, grain, quantity) {
  try {
    const res = await fetch(`${API_BASE}/dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromId, toId, grain, quantity: parseInt(quantity) })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error dispatching:', error);
    showToast('Failed to dispatch consignment', 'error');
    return null;
  }
}

async function addBeneficiaryToFirebase(name, rationCardId, fpsId) {
  try {
    const res = await fetch(`${API_BASE}/add-beneficiary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rationCardId, fpsId })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error registering beneficiary:', error);
    showToast('Failed to register beneficiary', 'error');
    return null;
  }
}

async function distributeToFirebase(fpsId, beneficiaryId, grain, quantity) {
  try {
    const res = await fetch(`${API_BASE}/distribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fpsId, beneficiaryId, grain, quantity: parseInt(quantity) })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error distributing ration:', error);
    showToast('Failed to distribute ration', 'error');
    return null;
  }
}

async function addGrainToFirebase(grainName) {
  try {
    const res = await fetch(`${API_BASE}/add-grain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grainName })
    });
    const result = await res.json();
    if (result.error) {
      showToast(result.message || 'Failed to add grain', 'error');
      return null;
    }
    return result;
  } catch (error) {
    console.error('Error adding grain:', error);
    showToast('Failed to add grain', 'error');
    return null;
  }
}

async function removeGrainFromFirebase(grainName) {
  try {
    const res = await fetch(`${API_BASE}/remove-grain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grainName })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error removing grain:', error);
    showToast('Failed to remove grain', 'error');
    return null;
  }
}

async function addLocationToFirebase(locId, name, type, state, city, demand) {
  try {
    const res = await fetch(`${API_BASE}/add-location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locId, name, type, state, city, demand })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error adding location:', error);
    showToast('Failed to add location', 'error');
    return null;
  }
}

async function deleteLocationFromFirebase(locId) {
  try {
    const res = await fetch(`${API_BASE}/delete-location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locId })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error deleting location:', error);
    showToast('Failed to delete location', 'error');
    return null;
  }
}
