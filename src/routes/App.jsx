import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"

// Pages
import AudienceBuilder from "../pages/target-market/AudienceBuilder"
import Performance from "../pages/Performance"
import FilesList from "../pages/FilesList"
import BusinessSettings from "../pages/BusinessSettings/BusinessSettings"
import GlobalBuilds from "../pages/target-market/GlobalBuilds"
import UserBuilds from "../pages/target-market/UserBuilds"
import DealerBuilds from "../pages/target-market/DealerBuilds"
import SimpleLoginPage from "../pages/SimpleLoginPage"
import SimpleMFACodePage from "../pages/SimpleMFACodePage"
import EntryPage from "../pages/EntryPage"
import AdminPanel from "../pages/AdminPanel"
import NewUser from "../pages/AdminPanel/NewUser"
import FeedProvider from "../pages/AdminPanel/FeedProvider"
import ProviderManagement from "../pages/AdminPanel/ProviderManagement"
import InventoryBuilder from "../pages/Campaigns/InventoryBuilder"
import UserManagement from "../pages/AdminPanel/UserManagement"
import ForgotPassword from "../pages/ForgotPassword"
import RecoveryPassword from "../pages/RecoveryPassword"
import WithPermissionRouter from "./WithPermissionRouter"
import SystemAlerts from "../pages/AdminPanel/SystemAlerts"
import Sold from "../pages/Campaigns/Sold"
import Irregular from "../pages/Campaigns/Irregular"
import CustomerBuilder from "../pages/target-market/CustomerBuilder"
import DvSystemAlerts from "../pages/AdminPanel/DvSystemAlerts"

function App() {
  return (
    <div className="bg-[#002E5D] h-screen">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/target-market/audience-builder"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <AudienceBuilder />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/target-market/customer-builder"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <CustomerBuilder />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/target-market/user-builds"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <UserBuilds />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/target-market/dealer-builds"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <DealerBuilds />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/target-market/global-builds"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <GlobalBuilds />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/business-settings/profile"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <BusinessSettings activeTab={0} />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/business-settings/inventory-urls"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <BusinessSettings activeTab={1} />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/business-settings/customize"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <BusinessSettings activeTab={2} />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/business-settings/connect"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <BusinessSettings activeTab={3} />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/business-settings/hierarchy"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <BusinessSettings activeTab={4} />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/business-settings/alerts"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <BusinessSettings activeTab={5} />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/business-settings/alert-control"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <BusinessSettings activeTab={6} />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/new-user"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <NewUser />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/user-management"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <UserManagement />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/feed-providers"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <FeedProvider />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/user-bulk-upload"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <AdminPanel />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/customize"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <AdminPanel />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/dealer-list"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <AdminPanel />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/provider-management"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <ProviderManagement />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/feed-system-alerts"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <SystemAlerts />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/admin-panel/dv-system-alerts"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin"]}
                  grantByRols={true}
                >
                  <DvSystemAlerts />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/campaigns/inventory-builder"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <InventoryBuilder />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/campaigns/sold-table"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <Sold />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/campaigns/irregular"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management", "Staff"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <Irregular />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/inventory/outbound/:platform_id"
              element={<FilesList />}
            />
            <Route
              exact
              path="/performance"
              element={
                <WithPermissionRouter
                  rols={["super-admin", "admin", "Management"]}
                  grantByRols={true}
                  requireDealer={true}
                >
                  <Performance />
                </WithPermissionRouter>
              }
            />
            <Route path="/login" element={<SimpleLoginPage />} />
            <Route path="/validate-mfa" element={<SimpleMFACodePage />} />
            <Route path="/" element={<EntryPage />} />
            <Route
              exact
              path="/forgot-password"
              element={
                <WithPermissionRouter loggedNeeded={false}>
                  <ForgotPassword />
                </WithPermissionRouter>
              }
            />
            <Route
              exact
              path="/recover-password"
              element={
                <WithPermissionRouter loggedNeeded={false}>
                  <RecoveryPassword />
                </WithPermissionRouter>
              }
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
