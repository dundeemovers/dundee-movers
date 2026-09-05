-- =============================================================================
-- Dundee Movers Supabase Production Schema & Migration
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Leads & Quotes Table
CREATE TABLE IF NOT EXISTS public.leads_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    customer_email TEXT,
    move_type TEXT NOT NULL DEFAULT 'House / Flat Move',
    preferred_date DATE,
    
    -- Exact Pickup Access Details
    pickup_address TEXT NOT NULL,
    pickup_postcode TEXT NOT NULL,
    pickup_floor TEXT NOT NULL DEFAULT 'Ground Floor / Bungalow',
    pickup_lift BOOLEAN NOT NULL DEFAULT FALSE,
    pickup_conditions TEXT[] DEFAULT '{}',
    
    -- Exact Delivery Access Details
    delivery_address TEXT NOT NULL,
    delivery_postcode TEXT NOT NULL,
    delivery_floor TEXT NOT NULL DEFAULT 'Ground Floor / Bungalow',
    delivery_lift BOOLEAN NOT NULL DEFAULT FALSE,
    delivery_conditions TEXT[] DEFAULT '{}',
    
    -- Manifest & Logistics Sizing
    items JSONB NOT NULL DEFAULT '{}'::jsonb,
    custom_notes TEXT,
    selected_services TEXT[] DEFAULT '{}',
    estimated_volume_m3 NUMERIC(5, 2) NOT NULL DEFAULT 10.0,
    recommended_van TEXT NOT NULL DEFAULT '1x 3.5T Luton Van with Tail-Lift',
    recommended_crew TEXT NOT NULL DEFAULT '2 Professional Movers',
    
    -- Estimated Guaranteed Pricing Range (£)
    estimated_price_min INTEGER NOT NULL DEFAULT 180,
    estimated_price_max INTEGER NOT NULL DEFAULT 260,
    
    -- Pipeline Status
    status TEXT NOT NULL DEFAULT 'new' 
        CHECK (status IN ('new', 'auto_quoted', 'survey_booked', 'confirmed', 'deposit_paid', 'completed', 'lost')),
    source TEXT NOT NULL DEFAULT 'website_wizard'
);

-- 2. Fleet & Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    license_plate TEXT NOT NULL UNIQUE,
    vehicle_type TEXT NOT NULL, -- MWB, LWB, Luton Box Van, 7.5T Lorry
    cubic_capacity_m3 NUMERIC(4, 1) NOT NULL,
    has_electric_tail_lift BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'retired'))
);

-- 3. Operations & Moves Table (Front Desk)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    quote_id UUID REFERENCES public.leads_quotes(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    move_date DATE NOT NULL,
    time_window TEXT NOT NULL DEFAULT '08:30 - 09:30 AM',
    
    pickup_address TEXT NOT NULL,
    pickup_floor TEXT NOT NULL,
    pickup_lift BOOLEAN NOT NULL DEFAULT FALSE,
    
    delivery_address TEXT NOT NULL,
    delivery_floor TEXT NOT NULL,
    delivery_lift BOOLEAN NOT NULL DEFAULT FALSE,
    
    assigned_vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    assigned_crew TEXT[] DEFAULT '{}',
    stair_equipment_required BOOLEAN NOT NULL DEFAULT FALSE,
    
    job_status TEXT NOT NULL DEFAULT 'scheduled'
        CHECK (job_status IN ('scheduled', 'crew_dispatched', 'on_site_loading', 'in_transit', 'unloading', 'completed', 'cancelled')),
        
    final_price INTEGER NOT NULL DEFAULT 0,
    deposit_paid INTEGER NOT NULL DEFAULT 0,
    balance_due INTEGER NOT NULL DEFAULT 0,
    payment_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (payment_status IN ('pending', 'deposit_received', 'settled_in_full'))
);

-- 4. Automated Communications & Email Logs
CREATE TABLE IF NOT EXISTS public.email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    quote_id UUID REFERENCES public.leads_quotes(id) ON DELETE CASCADE,
    recipient_email TEXT NOT NULL,
    template_type TEXT NOT NULL, -- instant_quote, van_hold_followup, booking_confirmation, review_request
    subject TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('queued', 'sent', 'delivered', 'failed')),
    opened_at TIMESTAMPTZ,
    error_message TEXT
);

-- Indexes for lightning fast Front Desk and Leads queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads_quotes(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads_quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_move_date ON public.jobs(move_date);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(job_status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Allow public insert from website quote wizard
CREATE POLICY "Allow public insert to leads_quotes" 
ON public.leads_quotes FOR INSERT WITH CHECK (true);

-- Allow authenticated staff read/update access
CREATE POLICY "Allow authenticated staff all on leads_quotes" 
ON public.leads_quotes FOR ALL USING (true);

CREATE POLICY "Allow authenticated staff all on jobs" 
ON public.jobs FOR ALL USING (true);

CREATE POLICY "Allow authenticated staff all on vehicles" 
ON public.vehicles FOR ALL USING (true);

CREATE POLICY "Allow authenticated staff all on email_logs" 
ON public.email_logs FOR ALL USING (true);
