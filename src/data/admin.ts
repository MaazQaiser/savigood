import type { OrderStatus, QuoteStatus, LineItem, ShipmentStep } from './buyer'

export type ClientStatus = 'active' | 'inactive' | 'prospect'
export type RfqStatus = 'new' | 'in_review' | 'quoted' | 'closed'

export interface Client {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  company: string
  status: ClientStatus
  city: string
  country: string
  address: string
  createdAt: string
  orderCount: number
  totalSpend: number
}

export interface Rfq {
  id: string
  clientId: string
  clientName: string
  title: string
  status: RfqStatus
  createdAt: string
  neededBy?: string
  description: string
  attachments: string[]
}

export interface AdminQuote {
  id: string
  clientId: string
  clientName: string
  rfqId?: string
  title: string
  status: QuoteStatus
  createdAt: string
  validUntil: string
  total: number
  depositPercent: number
  lineItems: LineItem[]
  notes?: string
}

export interface AdminOrder {
  id: string
  clientId: string
  clientName: string
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

export interface AdminConversation {
  id: string
  buyerName: string
  company: string
  lastMessage: string
  lastAt: string
  unread: number
}

export interface AdminChatMessage {
  id: string
  conversationId: string
  sender: 'buyer' | 'admin'
  text: string
  at: string
}

export interface AdminFile {
  id: string
  name: string
  clientName: string
  size: string
  type: string
  uploadedAt: string
  category: string
}

export const clients: Client[] = [
  {
    id: 'CL-001',
    name: 'Alex Johnson',
    contactName: 'Alex Johnson',
    email: 'alex@acme.com',
    phone: '+1 (555) 234-8890',
    company: 'Acme Corporation',
    status: 'active',
    city: 'San Francisco, CA',
    country: 'United States',
    address: '1200 Market Street, Suite 400',
    createdAt: '2025-11-02',
    orderCount: 12,
    totalSpend: 148200,
  },
  {
    id: 'CL-002',
    name: 'Priya Patel',
    contactName: 'Priya Patel',
    email: 'priya@globex.io',
    phone: '+1 (555) 441-2201',
    company: 'Globex Inc',
    status: 'active',
    city: 'Austin, TX',
    country: 'United States',
    address: '88 Congress Ave',
    createdAt: '2026-01-14',
    orderCount: 7,
    totalSpend: 62400,
  },
  {
    id: 'CL-003',
    name: 'Marcus Chen',
    contactName: 'Marcus Chen',
    email: 'm.chen@initech.co',
    phone: '+1 (555) 902-1188',
    company: 'Initech',
    status: 'prospect',
    city: 'Seattle, WA',
    country: 'United States',
    address: '400 Pine Street',
    createdAt: '2026-06-20',
    orderCount: 0,
    totalSpend: 0,
  },
  {
    id: 'CL-004',
    name: 'Elena Rossi',
    contactName: 'Elena Rossi',
    email: 'elena@umbrella.eu',
    phone: '+39 02 1234 5678',
    company: 'Umbrella Co',
    status: 'active',
    city: 'Milan',
    country: 'Italy',
    address: 'Via della Spiga 12',
    createdAt: '2025-08-09',
    orderCount: 18,
    totalSpend: 291500,
  },
  {
    id: 'CL-005',
    name: 'Tom Bradley',
    contactName: 'Tom Bradley',
    email: 'tom@starkindustries.com',
    phone: '+1 (555) 100-2000',
    company: 'Stark Industries',
    status: 'inactive',
    city: 'New York, NY',
    country: 'United States',
    address: '200 Park Avenue',
    createdAt: '2024-03-11',
    orderCount: 4,
    totalSpend: 38900,
  },
]

export const rfqs: Rfq[] = [
  {
    id: 'RFQ-2026-088',
    clientId: 'CL-001',
    clientName: 'Acme Corporation',
    title: 'Industrial Fasteners — Q3 Bulk',
    status: 'new',
    createdAt: '2026-07-18',
    neededBy: '2026-08-15',
    description: 'Need Grade 8.8 hex bolts M8/M10 in bulk for Q3 production. Prefer powder-coated finish where available. Include freight to SF warehouse.',
    attachments: ['PO-draft.pdf', 'spec-sheet.xlsx'],
  },
  {
    id: 'RFQ-2026-087',
    clientId: 'CL-002',
    clientName: 'Globex Inc',
    title: 'Custom Steel Brackets',
    status: 'in_review',
    createdAt: '2026-07-16',
    neededBy: '2026-08-01',
    description: '200× L-brackets 200mm, powder coated black. Need CAD confirmation before production.',
    attachments: ['bracket-drawing.dwg'],
  },
  {
    id: 'RFQ-2026-084',
    clientId: 'CL-004',
    clientName: 'Umbrella Co',
    title: 'Warehouse Shelving Expansion',
    status: 'quoted',
    createdAt: '2026-07-10',
    neededBy: '2026-09-01',
    description: '16 heavy-duty shelf bays, 8ft, for Milan DC. Installation hardware included.',
    attachments: ['floor-plan.pdf'],
  },
  {
    id: 'RFQ-2026-079',
    clientId: 'CL-003',
    clientName: 'Initech',
    title: 'Safety PPE Starter Kit',
    status: 'new',
    createdAt: '2026-07-19',
    neededBy: '2026-07-30',
    description: 'Helmets, gloves, and vests for 50 technicians. Branding optional.',
    attachments: [],
  },
  {
    id: 'RFQ-2026-071',
    clientId: 'CL-001',
    clientName: 'Acme Corporation',
    title: 'Conveyor Belt Replacement',
    status: 'closed',
    createdAt: '2026-06-01',
    description: 'Closed — buyer went with alternate vendor.',
    attachments: [],
  },
]

export const adminQuotes: AdminQuote[] = [
  {
    id: 'QT-2026-0142',
    clientId: 'CL-001',
    clientName: 'Acme Corporation',
    rfqId: 'RFQ-2026-088',
    title: 'Industrial Fasteners — Q3 Bulk',
    status: 'pending',
    createdAt: '2026-07-14',
    validUntil: '2026-07-28',
    total: 18400,
    depositPercent: 30,
    notes: 'Lead time ~3 weeks after deposit.',
    lineItems: [
      { id: 'li1', description: 'M8 Hex Bolts Grade 8.8 (box of 500)', quantity: 40, unitPrice: 120 },
      { id: 'li2', description: 'M10 Hex Nuts Grade 8 (box of 500)', quantity: 40, unitPrice: 95 },
      { id: 'li3', description: 'Flat Washers M8/M10 Assortment', quantity: 20, unitPrice: 180 },
      { id: 'li4', description: 'Freight & Handling', quantity: 1, unitPrice: 2200 },
    ],
  },
  {
    id: 'QT-2026-0138',
    clientId: 'CL-002',
    clientName: 'Globex Inc',
    rfqId: 'RFQ-2026-087',
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
    clientId: 'CL-001',
    clientName: 'Acme Corporation',
    title: 'Packaging Materials — Monthly',
    status: 'approved',
    createdAt: '2026-06-28',
    validUntil: '2026-07-12',
    total: 4200,
    depositPercent: 50,
    lineItems: [
      { id: 'li1', description: 'Corrugated Boxes 24×18×12', quantity: 1000, unitPrice: 2.8 },
      { id: 'li2', description: 'Bubble Wrap Rolls 12"', quantity: 50, unitPrice: 28 },
    ],
  },
  {
    id: 'QT-2026-0115',
    clientId: 'CL-003',
    clientName: 'Initech',
    title: 'Safety PPE Kit',
    status: 'rejected',
    createdAt: '2026-06-15',
    validUntil: '2026-06-29',
    total: 3100,
    depositPercent: 30,
    lineItems: [
      { id: 'li1', description: 'Safety Helmets Class E', quantity: 50, unitPrice: 32 },
      { id: 'li2', description: 'Cut-Resistant Gloves', quantity: 100, unitPrice: 15 },
    ],
  },
]

export const adminOrders: AdminOrder[] = [
  {
    id: 'ORD-2026-0087',
    clientId: 'CL-001',
    clientName: 'Acme Corporation',
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
      { id: 'li1', description: 'Corrugated Boxes 24×18×12', quantity: 1000, unitPrice: 2.8 },
      { id: 'li2', description: 'Bubble Wrap Rolls 12"', quantity: 50, unitPrice: 28 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Confirmed', date: '2026-07-01', completed: true },
      { id: 's2', label: 'In Production', description: 'Preparing', date: '2026-07-05', completed: true },
      { id: 's3', label: 'Shipped', description: 'With carrier', date: '2026-07-12', completed: true },
      { id: 's4', label: 'In Transit', description: 'En route', date: '2026-07-14', completed: true, current: true },
      { id: 's5', label: 'Delivered', description: 'Delivered', completed: false },
    ],
  },
  {
    id: 'ORD-2026-0071',
    clientId: 'CL-001',
    clientName: 'Acme Corporation',
    quoteId: 'QT-2026-0098',
    title: 'Electrical Conduit Bundle',
    status: 'in_production',
    createdAt: '2026-07-08',
    total: 15600,
    depositPaid: 4680,
    balanceDue: 10920,
    lineItems: [
      { id: 'li1', description: 'EMT Conduit 3/4" 10ft', quantity: 500, unitPrice: 18 },
      { id: 'li2', description: 'Couplings Kit', quantity: 50, unitPrice: 84 },
      { id: 'li3', description: 'Freight', quantity: 1, unitPrice: 2400 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Confirmed', date: '2026-07-08', completed: true },
      { id: 's2', label: 'In Production', description: 'Preparing', date: '2026-07-12', completed: true, current: true },
      { id: 's3', label: 'Shipped', description: 'With carrier', completed: false },
      { id: 's4', label: 'In Transit', description: 'En route', completed: false },
      { id: 's5', label: 'Delivered', description: 'Delivered', completed: false },
    ],
  },
  {
    id: 'ORD-2026-0064',
    clientId: 'CL-004',
    clientName: 'Umbrella Co',
    quoteId: 'QT-2026-0085',
    title: 'Warehouse Shelving Units',
    status: 'confirmed',
    createdAt: '2026-07-15',
    total: 22400,
    depositPaid: 6720,
    balanceDue: 15680,
    lineItems: [
      { id: 'li1', description: 'Heavy Duty Shelf Bay 8ft', quantity: 16, unitPrice: 1100 },
      { id: 'li2', description: 'Hardware Kit', quantity: 16, unitPrice: 150 },
      { id: 'li3', description: 'Freight', quantity: 1, unitPrice: 2400 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Confirmed', date: '2026-07-15', completed: true, current: true },
      { id: 's2', label: 'In Production', description: 'Preparing', completed: false },
      { id: 's3', label: 'Shipped', description: 'With carrier', completed: false },
      { id: 's4', label: 'In Transit', description: 'En route', completed: false },
      { id: 's5', label: 'Delivered', description: 'Delivered', completed: false },
    ],
  },
  {
    id: 'ORD-2026-0079',
    clientId: 'CL-002',
    clientName: 'Globex Inc',
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
      { id: 'li2', description: 'Hose Adapters', quantity: 24, unitPrice: 100 },
    ],
    shipmentSteps: [
      { id: 's1', label: 'Order Confirmed', description: 'Confirmed', date: '2026-06-10', completed: true },
      { id: 's2', label: 'In Production', description: 'Preparing', date: '2026-06-14', completed: true },
      { id: 's3', label: 'Shipped', description: 'With carrier', date: '2026-06-20', completed: true },
      { id: 's4', label: 'In Transit', description: 'En route', date: '2026-06-22', completed: true },
      { id: 's5', label: 'Delivered', description: 'Delivered', date: '2026-06-27', completed: true, current: true },
    ],
  },
]

export const adminConversations: AdminConversation[] = [
  {
    id: 'ac1',
    buyerName: 'Alex Johnson',
    company: 'Acme Corporation',
    lastMessage: 'Thanks Sam. Looking at QT-2026-0142 now.',
    lastAt: '11:05 AM',
    unread: 1,
  },
  {
    id: 'ac2',
    buyerName: 'Priya Patel',
    company: 'Globex Inc',
    lastMessage: 'Can we adjust the die setup fee?',
    lastAt: 'Yesterday',
    unread: 1,
  },
  {
    id: 'ac3',
    buyerName: 'Elena Rossi',
    company: 'Umbrella Co',
    lastMessage: 'Shelving quote looks good — proceeding.',
    lastAt: 'Jul 15',
    unread: 0,
  },
]

export const adminMessages: AdminChatMessage[] = [
  {
    id: 'am1',
    conversationId: 'ac1',
    sender: 'admin',
    text: 'Hi Alex — QT-2026-0142 is ready for review.',
    at: '10:42 AM',
  },
  {
    id: 'am2',
    conversationId: 'ac1',
    sender: 'buyer',
    text: 'Thanks Sam. Looking at QT-2026-0142 now.',
    at: '11:05 AM',
  },
  {
    id: 'am3',
    conversationId: 'ac2',
    sender: 'buyer',
    text: 'Can we adjust the die setup fee?',
    at: 'Yesterday',
  },
]

export const adminFiles: AdminFile[] = [
  {
    id: 'af1',
    name: 'PO-Acme-Q3-Fasteners.pdf',
    clientName: 'Acme Corporation',
    size: '248 KB',
    type: 'PDF',
    uploadedAt: '2026-07-14',
    category: 'Purchase Order',
  },
  {
    id: 'af2',
    name: 'Spec-Sheet-Brackets-v2.pdf',
    clientName: 'Globex Inc',
    size: '1.2 MB',
    type: 'PDF',
    uploadedAt: '2026-07-10',
    category: 'Specification',
  },
  {
    id: 'af3',
    name: 'floor-plan.pdf',
    clientName: 'Umbrella Co',
    size: '890 KB',
    type: 'PDF',
    uploadedAt: '2026-07-10',
    category: 'Reference',
  },
  {
    id: 'af4',
    name: 'Tax-Exemption-Certificate.pdf',
    clientName: 'Acme Corporation',
    size: '156 KB',
    type: 'PDF',
    uploadedAt: '2026-06-02',
    category: 'Compliance',
  },
  {
    id: 'af5',
    name: 'bracket-drawing.dwg',
    clientName: 'Globex Inc',
    size: '2.1 MB',
    type: 'DWG',
    uploadedAt: '2026-07-16',
    category: 'CAD',
  },
]

export { formatCurrency, formatDate } from './buyer'
