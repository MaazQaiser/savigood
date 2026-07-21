import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { DesignSystemShowcase } from '@/pages/design-system/DesignSystemShowcase'
import { LoginPage } from '@/pages/auth/LoginPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { BuyerDashboardPage } from '@/pages/buyer/DashboardPage'
import { QuoteListPage } from '@/pages/buyer/QuoteListPage'
import { QuoteDetailsPage } from '@/pages/buyer/QuoteDetailsPage'
import { PaymentsPage } from '@/pages/buyer/PaymentsPage'
import { PaymentFormPage } from '@/pages/buyer/PaymentFormPage'
import { PaymentSuccessPage } from '@/pages/buyer/PaymentSuccessPage'
import { OrderListPage } from '@/pages/buyer/OrderListPage'
import { OrderDetailsPage } from '@/pages/buyer/OrderDetailsPage'
import { ChatPage } from '@/pages/buyer/ChatPage'
import { FilesPage } from '@/pages/buyer/FilesPage'
import { AccountPage } from '@/pages/buyer/AccountPage'
import { AdminDashboardPage } from '@/pages/admin/DashboardPage'
import { ClientListPage } from '@/pages/admin/ClientListPage'
import { ClientDetailsPage } from '@/pages/admin/ClientDetailsPage'
import { ClientFormPage } from '@/pages/admin/ClientFormPage'
import { RfqInboxPage } from '@/pages/admin/RfqInboxPage'
import { RfqDetailsPage } from '@/pages/admin/RfqDetailsPage'
import { AdminQuoteListPage } from '@/pages/admin/AdminQuoteListPage'
import { QuoteBuilderPage } from '@/pages/admin/QuoteBuilderPage'
import { AdminOrderListPage } from '@/pages/admin/AdminOrderListPage'
import { AdminOrderDetailsPage } from '@/pages/admin/AdminOrderDetailsPage'
import { ReportsPage } from '@/pages/admin/ReportsPage'
import { AdminChatPage } from '@/pages/admin/AdminChatPage'
import { AdminFilesPage } from '@/pages/admin/AdminFilesPage'
import { LegalLayout } from '@/components/layout/LegalLayout'
import { TermsOfServicePage } from '@/pages/legal/TermsOfServicePage'
import { PrivacyPolicyPage } from '@/pages/legal/PrivacyPolicyPage'
import { MsaPage } from '@/pages/legal/MsaPage'
import { NotFoundPage } from '@/pages/system/NotFoundPage'
import { ServerErrorPage } from '@/pages/system/ServerErrorPage'
import { SystemStatesPage } from '@/pages/system/SystemStatesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '/legal',
    element: <LegalLayout />,
    children: [
      { index: true, element: <Navigate to="/legal/terms" replace /> },
      { path: 'terms', element: <TermsOfServicePage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'msa', element: <MsaPage /> },
    ],
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '/500',
    element: <ServerErrorPage />,
  },
  {
    path: '/design-system',
    element: <AppLayout variant="buyer" title="Design System" />,
    children: [
      { index: true, element: <DesignSystemShowcase /> },
    ],
  },
  {
    path: '/system-states',
    element: <AppLayout variant="buyer" title="System States" />,
    children: [
      { index: true, element: <SystemStatesPage /> },
    ],
  },
  {
    path: '/buyer',
    element: <AppLayout variant="buyer" />,
    children: [
      { index: true, element: <Navigate to="/buyer/dashboard" replace /> },
      { path: 'dashboard', element: <BuyerDashboardPage /> },
      { path: 'quotes', element: <QuoteListPage /> },
      { path: 'quotes/:quoteId', element: <QuoteDetailsPage /> },
      { path: 'payments', element: <PaymentsPage /> },
      { path: 'payments/deposit', element: <PaymentFormPage type="deposit" /> },
      { path: 'payments/balance', element: <PaymentFormPage type="balance" /> },
      { path: 'payments/success', element: <PaymentSuccessPage /> },
      { path: 'orders', element: <OrderListPage /> },
      { path: 'orders/:orderId', element: <OrderDetailsPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'chat/:conversationId', element: <ChatPage /> },
      { path: 'files', element: <FilesPage /> },
      { path: 'account', element: <AccountPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AppLayout variant="admin" />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'clients', element: <ClientListPage /> },
      { path: 'clients/new', element: <ClientFormPage /> },
      { path: 'clients/:clientId', element: <ClientDetailsPage /> },
      { path: 'clients/:clientId/edit', element: <ClientFormPage /> },
      { path: 'rfqs', element: <RfqInboxPage /> },
      { path: 'rfqs/:rfqId', element: <RfqDetailsPage /> },
      { path: 'quotes', element: <AdminQuoteListPage /> },
      { path: 'quotes/new', element: <QuoteBuilderPage /> },
      { path: 'quotes/:quoteId/edit', element: <QuoteBuilderPage /> },
      { path: 'orders', element: <AdminOrderListPage /> },
      { path: 'orders/:orderId', element: <AdminOrderDetailsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'chat', element: <AdminChatPage /> },
      { path: 'chat/:conversationId', element: <AdminChatPage /> },
      { path: 'files', element: <AdminFilesPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
