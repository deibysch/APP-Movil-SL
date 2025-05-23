export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  caseCount: number;
  lastContact: string;
}

export interface LegalProcess {
  id: string;
  title: string;
  caseNumber: string;
  client: string;
  status: string;
  type: string;
  startDate: string;
  nextHearing: string | null;
  lastUpdate: string;
}

export interface TrackingItem {
  id: string;
  title: string;
  caseNumber: string;
  description: string;
  status: 'pending' | 'urgent' | 'completed';
  dueDate: string;
}

export interface JudicialHouse {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  website: string;
}