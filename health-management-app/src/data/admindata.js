// Admin Authentication Data and Logic

export const adminCredentials = {
  username: 'admin',
  password: 'admin123',
  // You can add multiple admin accounts here
  accounts: [
    { username: 'admin', password: 'admin123', role: 'super_admin' },
    { username: 'doctor', password: 'doctor123', role: 'doctor' },
    { username: 'nurse', password: 'nurse123', role: 'nurse' },
  ]
};

// Validate admin login
export const validateAdminLogin = (username, password) => {
  return adminCredentials.accounts.some(
    account => account.username === username && account.password === password
  );
};

// Get admin role
export const getAdminRole = (username) => {
  const account = adminCredentials.accounts.find(acc => acc.username === username);
  return account ? account.role : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const authData = localStorage.getItem('healthtrack-auth');
  if (!authData) return false;
  
  try {
    const { username, timestamp } = JSON.parse(authData);
    // Session expires after 24 hours
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const now = Date.now();
    
    if (now - timestamp > sessionDuration) {
      logout();
      return false;
    }
    
    return !!username;
  } catch (e) {
    return false;
  }
};

// Login function
export const login = (username, password) => {
  if (validateAdminLogin(username, password)) {
    const authData = {
      username,
      role: getAdminRole(username),
      timestamp: Date.now(),
    };
    localStorage.setItem('healthtrack-auth', JSON.stringify(authData));
    return { success: true, role: authData.role };
  }
  return { success: false, error: 'Invalid username or password' };
};

// Logout function
export const logout = () => {
  localStorage.removeItem('healthtrack-auth');
};

// Get current user
export const getCurrentUser = () => {
  const authData = localStorage.getItem('healthtrack-auth');
  if (!authData) return null;
  
  try {
    const { username, role } = JSON.parse(authData);
    return { username, role };
  } catch (e) {
    return null;
  }
};

// Admin permissions
export const adminPermissions = {
  super_admin: {
    canViewAllData: true,
    canEditSettings: true,
    canDeleteData: true,
    canExportData: true,
    canManageUsers: true,
  },
  doctor: {
    canViewAllData: true,
    canEditSettings: true,
    canDeleteData: false,
    canExportData: true,
    canManageUsers: false,
  },
  nurse: {
    canViewAllData: true,
    canEditSettings: false,
    canDeleteData: false,
    canExportData: false,
    canManageUsers: false,
  },
};

// Check if user has permission
export const hasPermission = (permission) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const permissions = adminPermissions[user.role];
  return permissions ? permissions[permission] : false;
};
