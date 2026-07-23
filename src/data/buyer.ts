export type QuoteStatus = 'pending' | 'approved' | 'rejected' | 'expired'
export type OrderStatus = 'pending' | 'confirmed' | 'in_production' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled'
export type PaymentType = 'deposit' | 'balance'
export type PaymentStatus = 'due' | 'paid' | 'overdue'

export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export interface Quote {
  id: string
  title: string
  status: QuoteStatus
  createdAt: string
  validUntil: string
  total: number
  depositPercent: number
  lineItems: LineItem[]
  notes?: string
}

export interface Order {
  id: string
  quoteId: string
  title: string
  status: OrderStatus
  createdAt: string
  total: number
  depositPaid: number
  balanceDue: number
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: string
  lineItems: LineItem[]
  shipmentSteps: ShipmentStep[]
}

export interface ShipmentStep {
  id: string
  label: string
  description: string
  date?: string
  completed: boolean
  current?: boolean
}

export interface PaymentItem {
  id: string
  orderId: string
  orderTitle: string
  type: PaymentType
  amount: number
  status: PaymentStatus
  dueDate: string
}

export interface Thread {
  id: string
  refType: 'order' | 'quote'
  refId: string
  title: string
  status: string
  lastMessage: string
  lastAt: string
  unread: number
}

export interface ChatMessage {
  id: string
  threadId: string
  sender: 'buyer' | 'admin'
  senderName?: string
  text: string
  at: string
}

export interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  uploadedAt: string
  category: string
  orderId?: string
  rfqId?: string
}

export interface BuyerProfile {
  name: string
  email: string
  phone: string
  company: string
  jobTitle: string
  address: string
  city: string
  country: string
}

export const buyerProfile: BuyerProfile = {
  name: 'Alex Johnson',
  email: 'alex@company.com',
  phone: '+1 (555) 234-8890',
  company: 'Acme Corporation',
  jobTitle: 'Procurement Manager',
  address: '1200 Market Street, Suite 400',
  city: 'San Francisco, CA 94103',
  country: 'United States',
}

export const quotes: Quote[] = [
  {
    id: 'QT-2026-0142',
    title: 'Industrial Fasteners — Q3 Bulk',
    status: 'pending',
    createdAt: '2026-07-14',
    validUntil: '2026-07-28',
    total: 18400,
    depositPercent: 30,
    notes: 'Lead time approximately 3 weeks after deposit clearance.',
    lineItems: [
      { id: 'li1', description: 'M8 Hex Bolts Grade 8.8 (box of 500)', quantity: 40, unitPrice: 120 },
      { id: 'li2', description: 'M10 Hex Nuts Grade 8 (box of 500)', quantity: 40, unitPrice: 95 },
      { id: 'li3', description: 'Flat Washers M8/M10 Assortment', quantity: 20, unitPrice: 180 },
      { id: 'li4', description: 'Freight & Handling', quantity: 1, unitPrice: 2200 },
    ],
  },
  {
    id: 'QT-2026-0138',
    title: 'Custom Steel Brackets',
    status: 'pending',
    createdAt: '2026-07-10',
    validUntil: '2026-07-24',
    total: 9600,
    depositPercent: 40,
    lineItems: [
      { id: 'li1', description: 'L-Bracket 200mm Powder Coated', quantity: 200, unitPrice: 28 },
      { id: 'li2', description: 'Custom Die Setup Fee', quantity: 1, unitPrice: 2400 },
      { id: 'li3', description: 'Freight', quantity: 1, unitPrice: 1600 },
    ],
  },
  {
    id: 'QT-2026-0129',
    title: 'Packaging Materials — Monthly',
    status: 'approved',
    createdAt: '2026-06-28',
    validUntil: '2026-07-12',
    total: 4200,
    depositPercent: 50,
    lineItems: [
      { id: 'li1', description: 'Corrugated Boxes 24x18x12 (unit)', quantity: 1000, unitPrice: 2.8 },
      { id: 'li2', description: 'Bubble Wrap Rolls 12"', quantity: 50, unitPrice: 28 },
    ],
  },
  {
    id: 'QT-2026-0115',
    title: 'Safety PPE Kit',
    status: 'rejected',
    createdAt: '2026-06-15',
    validUntil: '2026-06-29',
    total: 3100,
    depositPercent: 30,
    lineItems: [
      { id: 'li1', description: 'Safety Helmets Class E', quantity: 50, unitPrice: 32 },
      { id: 'li2', description: 'Cut-Resistant Gloves (pair)', quantity: 100, unitPrice: 15 },
    ],
  },
  {
    id: 'QT-2026-0102',
    title: 'Conveyor Belt Replacement',
    status: 'expired',
    createdAt: '2026-05-20',
    validUntil: '2026-06-03',
    total: 12800,
    depositPercent: 35,
    lineItems: [
      { id: 'li1', description: 'Belt Section 12m Heavy Duty', quantity: 2, unitPrice: 4800 },
      { id: 'li2', description: 'Installation Support (day)', quantity: 2, unitPrice: 1600 },
    ],
  },
]

export const orders: Order[] = [
  {
    id: 'ORD-2026-0087',
    quoteId: 'QT-2026-0129',
    title: 'Packaging Materials — Monthly',
    status: 'in_transit',
    createdAt: '2026-07-01',
    total: 4200,
    depositPaid: 2100,
    balanceDue: 2100,
    trackingNumber: '1Z999AA10123456784',
    carrier: 'UPS',
    estimatedDelivery: '2026-07-22',
    lineItems: [
      { id: 'li1', description: 'Corrugated Boxes 24x18x12 (unit)', quantity: 1000, unitPrice: 2.8 },
      { id: 'li2', description: 'Bubble Wrap Rolls 12"', quantity: 50, unitPrice: 28 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Payment received and order confirmed', date: '2026-07-01', completed: true },
      { id: 's2', label: 'In Production', description: 'Items being prepared for shipment', date: '2026-07-05', completed: true },
      { id: 's3', label: 'Shipped', description: 'Package handed to carrier', date: '2026-07-12', completed: true },
      { id: 's4', label: 'In Transit', description: 'En route to destination', date: '2026-07-14', completed: true, current: true },
      { id: 's5', label: 'Delivered', description: 'Package delivered to destination', completed: false },
    ],
  },
  {
    id: 'ORD-2026-0079',
    quoteId: 'QT-2026-0110',
    title: 'Hydraulic Fittings Assortment',
    status: 'delivered',
    createdAt: '2026-06-10',
    total: 7800,
    depositPaid: 2340,
    balanceDue: 0,
    trackingNumber: '9400111899223344556677',
    carrier: 'USPS',
    estimatedDelivery: '2026-06-28',
    lineItems: [
      { id: 'li1', description: 'JIC Fittings Kit A', quantity: 12, unitPrice: 450 },
      { id: 'li2', description: 'Hose Adapters Mixed', quantity: 24, unitPrice: 100 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Payment received and order confirmed', date: '2026-06-10', completed: true },
      { id: 's2', label: 'In Production', description: 'Items being prepared for shipment', date: '2026-06-14', completed: true },
      { id: 's3', label: 'Shipped', description: 'Package handed to carrier', date: '2026-06-20', completed: true },
      { id: 's4', label: 'In Transit', description: 'En route to destination', date: '2026-06-22', completed: true },
      { id: 's5', label: 'Delivered', description: 'Package delivered to destination', date: '2026-06-27', completed: true, current: true },
    ],
  },
  {
    id: 'ORD-2026-0071',
    quoteId: 'QT-2026-0098',
    title: 'Electrical Conduit Bundle',
    status: 'in_production',
    createdAt: '2026-07-08',
    total: 15600,
    depositPaid: 4680,
    balanceDue: 10920,
    lineItems: [
      { id: 'li1', description: 'EMT Conduit 3/4" 10ft', quantity: 500, unitPrice: 18 },
      { id: 'li2', description: 'Couplings & Connectors Kit', quantity: 50, unitPrice: 84 },
      { id: 'li3', description: 'Freight', quantity: 1, unitPrice: 2400 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Payment received and order confirmed', date: '2026-07-08', completed: true },
      { id: 's2', label: 'In Production', description: 'Items being prepared for shipment', date: '2026-07-12', completed: true, current: true },
      { id: 's3', label: 'Shipped', description: 'Package handed to carrier', completed: false },
      { id: 's4', label: 'In Transit', description: 'En route to destination', completed: false },
      { id: 's5', label: 'Delivered', description: 'Package delivered to destination', completed: false },
    ],
  },
  {
    id: 'ORD-2026-0064',
    quoteId: 'QT-2026-0085',
    title: 'Warehouse Shelving Units',
    status: 'confirmed',
    createdAt: '2026-07-15',
    total: 22400,
    depositPaid: 6720,
    balanceDue: 15680,
    lineItems: [
      { id: 'li1', description: 'Heavy Duty Shelf Bay 8ft', quantity: 16, unitPrice: 1100 },
      { id: 'li2', description: 'Installation Hardware Kit', quantity: 16, unitPrice: 150 },
      { id: 'li3', description: 'Freight', quantity: 1, unitPrice: 2400 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Payment received and order confirmed', date: '2026-07-15', completed: true, current: true },
      { id: 's2', label: 'In Production', description: 'Items being prepared for shipment', completed: false },
      { id: 's3', label: 'Shipped', description: 'Package handed to carrier', completed: false },
      { id: 's4', label: 'In Transit', description: 'En route to destination', completed: false },
      { id: 's5', label: 'Delivered', description: 'Package delivered to destination', completed: false },
    ],
  },
]

export const payments: PaymentItem[] = [
  {
    id: 'PAY-001',
    orderId: 'ORD-2026-0087',
    orderTitle: 'Packaging Materials — Monthly',
    type: 'balance',
    amount: 2100,
    status: 'due',
    dueDate: '2026-07-25',
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-2026-0071',
    orderTitle: 'Electrical Conduit Bundle',
    type: 'balance',
    amount: 10920,
    status: 'due',
    dueDate: '2026-08-01',
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-2026-0064',
    orderTitle: 'Warehouse Shelving Units',
    type: 'deposit',
    amount: 6720,
    status: 'paid',
    dueDate: '2026-07-15',
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-2026-0079',
    orderTitle: 'Hydraulic Fittings Assortment',
    type: 'balance',
    amount: 5460,
    status: 'paid',
    dueDate: '2026-06-20',
  },
]

export const threads: Thread[] = [
  {
    id: 'th-ord-0087',
    refType: 'order',
    refId: 'ORD-2026-0087',
    title: 'Packaging Materials — Monthly',
    status: 'in_transit',
    lastMessage: 'Tracking updated — estimated delivery July 22.',
    lastAt: 'Today',
    unread: 1,
  },
  {
    id: 'th-ord-0071',
    refType: 'order',
    refId: 'ORD-2026-0071',
    title: 'Electrical Conduit Bundle',
    status: 'in_production',
    lastMessage: 'Your order is now in production.',
    lastAt: 'Jul 12',
    unread: 0,
  },
  {
    id: 'th-ord-0064',
    refType: 'order',
    refId: 'ORD-2026-0064',
    title: 'Warehouse Shelving Units',
    status: 'confirmed',
    lastMessage: 'Order confirmed. Production starts next week.',
    lastAt: 'Jul 15',
    unread: 0,
  },
  {
    id: 'th-qt-0142',
    refType: 'quote',
    refId: 'QT-2026-0142',
    title: 'Industrial Fasteners — Q3 Bulk',
    status: 'pending',
    lastMessage: 'Your quote is ready for review.',
    lastAt: '10:42 AM',
    unread: 2,
  },
  {
    id: 'th-qt-0138',
    refType: 'quote',
    refId: 'QT-2026-0138',
    title: 'Custom Steel Brackets',
    status: 'pending',
    lastMessage: 'We need a few more spec details before pricing.',
    lastAt: 'Jul 10',
    unread: 0,
  },
]

export const messages: ChatMessage[] = [
  {
    id: 'm1',
    threadId: 'th-ord-0087',
    sender: 'admin',
    senderName: 'Sam Wilson',
    text: 'Hi Alex — tracking has been updated for ORD-2026-0087. Your package is now en route.',
    at: '9:15 AM',
  },
  {
    id: 'm2',
    threadId: 'th-ord-0087',
    sender: 'admin',
    senderName: 'Sam Wilson',
    text: 'Estimated delivery July 22. You can copy the tracking number from the order detail page.',
    at: 'Today',
  },
  {
    id: 'm3',
    threadId: 'th-qt-0142',
    sender: 'admin',
    senderName: 'Sam Wilson',
    text: 'Hi Alex — we have finalized the fasteners quote. Please review QT-2026-0142 when you get a moment.',
    at: '10:30 AM',
  },
  {
    id: 'm4',
    threadId: 'th-qt-0142',
    sender: 'admin',
    senderName: 'Sam Wilson',
    text: 'Your quote QT-2026-0142 is ready for review.',
    at: '10:42 AM',
  },
  {
    id: 'm5',
    threadId: 'th-qt-0138',
    sender: 'admin',
    senderName: 'Operations',
    text: 'Thanks for the bracket request. We need a few more spec details before we can price this accurately.',
    at: 'Jul 10',
  },
  {
    id: 'm6',
    threadId: 'th-ord-0071',
    sender: 'admin',
    senderName: 'Sam Wilson',
    text: 'Great news — your Electrical Conduit Bundle order is now in production.',
    at: 'Jul 12',
  },
  {
    id: 'm7',
    threadId: 'th-ord-0064',
    sender: 'admin',
    senderName: 'Sam Wilson',
    text: 'Order confirmed. Production is scheduled to start next week.',
    at: 'Jul 15',
  },
]

export const files: UploadedFile[] = [
  {
    id: 'f1',
    name: 'PO-Acme-Q3-Fasteners.pdf',
    size: '248 KB',
    type: 'PDF',
    uploadedAt: '2026-07-14',
    category: 'Purchase Order',
    orderId: 'ORD-2026-0087',
  },
  {
    id: 'f2',
    name: 'Spec-Sheet-Brackets-v2.pdf',
    size: '1.2 MB',
    type: 'PDF',
    uploadedAt: '2026-07-10',
    category: 'Specification',
    orderId: 'ORD-2026-0071',
  },
  {
    id: 'f3',
    name: 'Site-Photos-Warehouse.zip',
    size: '8.4 MB',
    type: 'ZIP',
    uploadedAt: '2026-07-08',
    category: 'Reference',
    orderId: 'ORD-2026-0064',
  },
  {
    id: 'f4',
    name: 'Tax-Exemption-Certificate.pdf',
    size: '156 KB',
    type: 'PDF',
    uploadedAt: '2026-06-02',
    category: 'Compliance',
  },
]

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
