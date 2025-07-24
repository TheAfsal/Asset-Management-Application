export class Branch {
    id: number;
    name: string;
    location?: string;
    code: string;
    status: 'active' | 'inactive';
    created_at: Date;
    updated_at: Date;
  }