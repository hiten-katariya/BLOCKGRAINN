/* Supabase Backend - Data fetched from API */
const API_BASE = '/api';

async function fetchAllData() {
  try {
    const res = await fetch(`${API_BASE}/db`);
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    console.log('✅ Data fetched successfully');
    return data;
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    return null;
  }
}

async function addStockToDB(godownId, grain, quantity) {
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
    return { error: true, message: 'Failed to add stock' };
  }
}

async function dispatchToDB(fromId, toId, grain, quantity) {
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
    return { error: true, message: 'Failed to dispatch' };
  }
}

async function addBeneficiaryToDB(name, rationCardId, fpsId, phoneNumber) {
  try {
    const res = await fetch(`${API_BASE}/add-beneficiary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rationCardId, fpsId, phoneNumber })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error registering beneficiary:', error);
    return { error: true, message: 'Failed to register beneficiary' };
  }
}

async function distributeToDB(fpsId, beneficiaryId, grain, quantity) {
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
    return { error: true, message: 'Failed to distribute ration' };
  }
}

async function addGrainToDB(grainName) {
  try {
    const res = await fetch(`${API_BASE}/add-grain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grainName })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error adding grain:', error);
    return { error: true, message: 'Failed to add grain' };
  }
}

async function removeGrainFromDB(grainName) {
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
    return { error: true, message: 'Failed to remove grain' };
  }
}

async function addLocationToDB(locId, name, type, state, city, demand) {
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
    return { error: true, message: 'Failed to add location' };
  }
}

async function deleteLocationFromDB(locId) {
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
    return { error: true, message: 'Failed to delete location' };
  }
}
