# 🔐 Login System & Role-Based Access Control

## Overview
The application now has a secure login system with 5 different user roles, each with specific access permissions.

---

## 👥 User Roles & Permissions

### 1. 👑 Admin (Full Access)
**User ID:** `admin`  
**Password:** `admin123`

**Access Level:** Complete system control
- ✅ Dashboard
- ✅ Central Stock (Add stock to godowns)
- ✅ Godown → Warehouse transfers
- ✅ Warehouse → City Hub transfers
- ✅ City Hub → FPS transfers
- ✅ Distribution (Beneficiary management)
- ✅ Transaction Ledger
- ✅ System Administration

**Use Case:** System administrators who need complete oversight and control

---

### 2. 🏛️ Central Officer (Full Access)
**User ID:** `central001`  
**Password:** `central123`

**Access Level:** Complete operational access
- ✅ Dashboard
- ✅ Central Stock (Add stock to godowns)
- ✅ Godown → Warehouse transfers
- ✅ Warehouse → City Hub transfers
- ✅ City Hub → FPS transfers
- ✅ Distribution (Beneficiary management)
- ✅ Transaction Ledger
- ✅ System Administration

**Use Case:** Central government officials managing the entire PDS

---

### 3. 🏭 Warehouse Manager (Dispatch & Distribution)
**User ID:** `warehouse001`  
**Password:** `warehouse123`

**Access Level:** Limited to dispatch and distribution
- ❌ Dashboard (No access)
- ❌ Central Stock (No access)
- ❌ Godown → Warehouse (No access)
- ✅ Warehouse → City Hub transfers
- ✅ City Hub → FPS transfers
- ✅ Distribution (Beneficiary management)
- ✅ Transaction Ledger

**Use Case:** State warehouse managers handling transfers from warehouse to FPS

---

### 4. 🏙️ City Hub Officer (Distribution Only)
**User ID:** `cityhub001`  
**Password:** `cityhub123`

**Access Level:** Limited to city-level operations
- ❌ Dashboard (No access)
- ❌ Central Stock (No access)
- ❌ Godown → Warehouse (No access)
- ❌ Warehouse → City Hub (No access)
- ✅ City Hub → FPS transfers
- ✅ Distribution (Beneficiary management)
- ✅ Transaction Ledger

**Use Case:** City hub officers managing distribution to Fair Price Shops

---

### 5. 🏪 FPS Operator (Distribution Only)
**User ID:** `fps001`  
**Password:** `fps123`

**Access Level:** Limited to final distribution
- ❌ Dashboard (No access)
- ❌ Central Stock (No access)
- ❌ Godown → Warehouse (No access)
- ❌ Warehouse → City Hub (No access)
- ❌ City Hub → FPS (No access)
- ✅ Distribution (Beneficiary management & ration distribution)
- ✅ Transaction Ledger

**Use Case:** Fair Price Shop operators distributing rations to beneficiaries

---

## 🚀 How to Use

### Step 1: Access Login Page
Navigate to: **http://localhost:3000/login**

### Step 2: Choose User Type
Click on any of the demo credential cards to auto-fill the login form, or manually enter credentials.

### Step 3: Login
- Enter User ID
- Enter Password
- Click "Sign In" or press Enter

### Step 4: Navigate System
Once logged in:
- Navigation menu shows only pages you have access to
- User profile displays in sidebar (desktop view)
- Logout button available at bottom of sidebar

---

## 🎯 Permission System

### How It Works:
1. **Authentication:** User credentials verified against database
2. **Session Storage:** User info stored in browser localStorage
3. **Navigation Filtering:** Sidebar shows only accessible pages
4. **View Protection:** Attempts to access unauthorized pages show error
5. **Auto-redirect:** Unauthenticated users redirected to login

### Permission Mapping:
```javascript
{
  admin: [
    'dashboard', 'central-admin', 'godown-to-warehouse',
    'warehouse-to-cityhub', 'cityhub-to-fps', 
    'beneficiary', 'transaction', 'system-admin'
  ],
  central: [
    'dashboard', 'central-admin', 'godown-to-warehouse',
    'warehouse-to-cityhub', 'cityhub-to-fps', 
    'beneficiary', 'transaction', 'system-admin'
  ],
  warehouse: [
    'warehouse-to-cityhub', 'cityhub-to-fps',
    'beneficiary', 'transaction'
  ],
  cityhub: [
    'cityhub-to-fps', 'beneficiary', 'transaction'
  ],
  fps: [
    'beneficiary', 'transaction'
  ]
}
```

---

## 🔒 Security Features

### Current Implementation:
- ✅ Login page with credential validation
- ✅ Session management with localStorage
- ✅ Role-based navigation filtering
- ✅ View-level access control
- ✅ Automatic redirect for unauthorized access
- ✅ Logout functionality with confirmation

### Session Management:
- User session stored in browser
- Persists across page refreshes
- Cleared on logout
- Checked on every page load

---

## 📱 User Interface

### Login Page Features:
- Gradient background design
- Interactive credential cards
- Auto-fill on click
- Real-time error messages
- Responsive design (mobile-friendly)
- Role-based color coding:
  - 🔴 Red: Admin
  - 🔵 Blue: Central Officer
  - 🟢 Green: Warehouse Manager
  - 🟣 Purple: City Hub Officer
  - 🟣 Indigo: FPS Operator

### Main Application:
- User profile badge in sidebar
- Shows user name and role
- Filtered navigation menu
- Logout button always visible
- Permission-based page access

---

## 🧪 Testing Different Roles

### Test Scenario 1: Admin
1. Login as `admin` / `admin123`
2. See all 8 navigation items
3. Access all pages without restriction

### Test Scenario 2: Warehouse Manager
1. Login as `warehouse001` / `warehouse123`
2. See only 4 navigation items:
   - Warehouse → City
   - City → FPS
   - Distribution
   - Ledger
3. Cannot access Dashboard or Central Stock

### Test Scenario 3: FPS Operator
1. Login as `fps001` / `fps123`
2. See only 2 navigation items:
   - Distribution
   - Ledger
3. Can only manage beneficiary distribution

---

## 🛠️ Customization

### Adding New Users:
Edit the `users` object in [login.ejs](views/login.ejs):

```javascript
'newuser001': {
    password: 'newpassword',
    role: 'warehouse',
    name: 'New User Name',
    permissions: ['warehouse-to-cityhub', 'beneficiary', 'transaction']
}
```

### Adding New Roles:
1. Define role in users object
2. Specify permissions array
3. Add to login page demo credentials (optional)

### Changing Permissions:
Modify the `permissions` array for any user to grant/revoke access.

---

## 🔄 Workflow Examples

### Example 1: Complete Flow (Admin/Central)
1. Login as Admin
2. Add stock to Central Godown
3. Transfer to State Warehouse
4. Transfer to City Hub
5. Transfer to FPS
6. Distribute to beneficiaries
7. View in Ledger
8. Logout

### Example 2: Warehouse Manager Flow
1. Login as Warehouse Manager
2. Receive stock from central (done by central officer)
3. Transfer stock from Warehouse to City Hub
4. Transfer stock from City Hub to FPS
5. View transactions in Ledger
6. Logout

### Example 3: FPS Operator Flow
1. Login as FPS Operator
2. Receive stock from City Hub (done by warehouse manager)
3. Register new beneficiaries
4. Distribute rations to beneficiaries
5. View distribution history in Ledger
6. Logout

---

## 📊 Access Matrix

| Feature | Admin | Central | Warehouse | City Hub | FPS |
|---------|-------|---------|-----------|----------|-----|
| Dashboard | ✅ | ✅ | ❌ | ❌ | ❌ |
| Central Stock | ✅ | ✅ | ❌ | ❌ | ❌ |
| Godown→Warehouse | ✅ | ✅ | ❌ | ❌ | ❌ |
| Warehouse→City | ✅ | ✅ | ✅ | ❌ | ❌ |
| City→FPS | ✅ | ✅ | ✅ | ✅ | ❌ |
| Distribution | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ledger | ✅ | ✅ | ✅ | ✅ | ✅ |
| Administration | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 🎨 UI/UX Features

### Login Page:
- Beautiful gradient background
- Glassmorphism card design
- Hover effects on credential cards
- Smooth animations
- Font Awesome icons
- Color-coded role badges

### Main Application:
- User profile in sidebar
- Role indicator
- First letter avatar
- Logout confirmation
- Permission-based visibility
- Clean, modern interface

---

## 🚨 Important Notes

1. **Demo Credentials:** Current passwords are for demonstration only. In production, use secure authentication.

2. **Session Persistence:** User session stored in localStorage. Clear browser data to logout manually.

3. **No Backend Auth:** Current implementation is frontend-only. For production, implement server-side authentication.

4. **Permission Changes:** If you modify a user's permissions, they must logout and login again to see changes.

5. **First-Time Access:** Users land on their first available page based on role (not always Dashboard).

---

## 🔜 Future Enhancements (Optional)

- [ ] Backend authentication with JWT tokens
- [ ] Password reset functionality
- [ ] User management interface for admins
- [ ] Session timeout/auto-logout
- [ ] Two-factor authentication
- [ ] Audit log for login/logout events
- [ ] Password strength requirements
- [ ] Account lockout after failed attempts

---

**Enjoy the secure, role-based PDS system! 🎉**
