# ALIGN Network — Full Architecture Document
## AI-Powered Opportunity Discovery & Business Matchmaking Platform

---

## PHASE 1: GAP ANALYSIS — Existing vs Required

### What exists (good foundation):
- profiles table with 768-dim pgvector HNSW index
- 12 profile categories (too limited)
- Basic embedding pipeline (name + description + services + problems_solved)
- Lead creation and provider notification
- Conversation state machine
- Verification tiers (3 levels)
- Subscription and credit system

### Critical gaps identified:

**Profile data gaps:**
- No education history
- No work experience timeline
- No skills taxonomy (just free-text array)
- No portfolio items as structured records
- No certifications
- No languages spoken
- No achievements / awards
- No ideal customer profile (ICP)
- No collaboration preferences
- No opportunity seeking preferences
- No startup-specific data (funding stage, team size, MRR)
- No job seeker / student specific fields
- No manufacturer / vendor specific fields
- Profile category enum is far too narrow (12 types vs 35+ needed)

**AI retrieval gaps:**
- Embedding text only uses 6 fields — misses 80% of discovery signals
- No skills-specific index for exact skill matching
- No location-based filtering beyond city
- No experience level signal
- No budget/rate signal in embedding
- No "looking for" signal (what does this person WANT, not just offer)
- No semantic tags for AI disambiguation

**Search gaps:**
- search_profiles() has no full-text fallback when vector similarity is low
- No skills filter
- No experience filter
- No budget range filter
- No language filter
- No "open to opportunities" filter

**Database gaps:**
- No skills master table (causes inconsistent skill names)
- No work_experience table
- No education table
- No portfolio_items table
- No certifications table
- No profile_connections table (networking graph)
- No saved_searches table
- No profile_views analytics
- No profile completeness scoring

---

## PHASE 2: USER ECOSYSTEM — Complete Type Architecture

### Primary User Types (35 types mapped to 8 super-categories)

**SUPER-CATEGORY: BUILDER**
- Founder, Startup Founder, Co-founder, Solo Founder
- Embedding weight: HIGH on vision, problems being solved, domain, stage

**SUPER-CATEGORY: PROFESSIONAL**
- Developer, Designer, Engineer, Researcher, Architect
- Data Scientist, Product Manager, Marketing Professional
- Sales Professional, Operations Professional
- Embedding weight: HIGH on skills, tech stack, past work

**SUPER-CATEGORY: SERVICE**
- Freelancer, Consultant, Agency, Service Provider
- Legal Professional, Finance Professional, Healthcare Professional
- Embedding weight: HIGH on services offered, problems solved, industries

**SUPER-CATEGORY: BUSINESS**
- Business Owner, Company, Manufacturer, Vendor, Supplier
- Embedding weight: HIGH on products, industries, geography, capacity

**SUPER-CATEGORY: TALENT**
- Job Seeker, Student, Intern, Researcher
- Embedding weight: HIGH on skills, education, availability, location

**SUPER-CATEGORY: CAPITAL**
- Investor, Angel Investor, VC, Fund
- Embedding weight: HIGH on investment thesis, portfolio, check size, stage

**SUPER-CATEGORY: GROWTH**
- Mentor, Coach, Trainer, Educator
- Embedding weight: HIGH on domain expertise, mentorship style, availability

**SUPER-CATEGORY: COMMUNITY**
- Creator, Influencer, Community Builder, Event Organizer
- NGO Representative, Normal User
- Embedding weight: HIGH on audience, niche, collaboration interests

---

## PHASE 3: COMPLETE ONBOARDING FORM ARCHITECTURE

### Section 1 — Identity (All user types)
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| full_name | text | YES | HIGH | Full name for trust |
| display_name | text | YES | HIGH | Public name / brand name |
| profile_type | enum | YES | CRITICAL | Primary type from 35 types |
| profile_sub_types | text[] | NO | HIGH | Secondary roles |
| tagline | text | YES | CRITICAL | One-line pitch — heavily embedded |
| bio | text | YES | CRITICAL | 150-300 word bio — fully embedded |
| avatar_url | text | NO | LOW | Cloudinary URL |
| gender | text | NO | LOW | Optional, for personalization |
| languages | text[] | YES | MEDIUM | Languages spoken |

### Section 2 — Location & Availability
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| city | text | YES | HIGH | Primary city |
| state | text | YES | MEDIUM | State |
| country | text | YES | HIGH | Country — default India |
| pin_code | text | NO | LOW | For hyperlocal matching |
| is_remote_friendly | boolean | YES | HIGH | Open to remote work |
| timezone | text | NO | MEDIUM | For global collaboration |
| availability_status | enum | YES | HIGH | available/busy/not_available |
| available_from | date | NO | MEDIUM | If currently unavailable |
| hours_per_week | int | NO | MEDIUM | Bandwidth signal |

### Section 3 — Professional Identity
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| headline | text | YES | CRITICAL | Professional headline — embedded |
| professional_summary | text | YES | CRITICAL | Long-form — fully embedded |
| years_of_experience | int | NO | HIGH | Overall experience |
| current_role | text | NO | HIGH | Current job title |
| current_organization | text | NO | MEDIUM | Current employer/org |
| domain_expertise | text[] | YES | CRITICAL | Top 3-5 domains |
| skills | text[] | YES | CRITICAL | Technical + soft skills |
| tools_and_technologies | text[] | NO | HIGH | Tech stack — embedded |
| industries_worked_in | text[] | YES | CRITICAL | Industries — embedded |
| industries_interested_in | text[] | NO | HIGH | Future interests — embedded |

### Section 4 — What You Offer
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| services_offered | text[] | YES* | CRITICAL | *Required for service providers |
| problems_you_solve | text[] | YES* | CRITICAL | Natural language problems — embedded |
| products_offered | text[] | NO | HIGH | For vendors/manufacturers |
| engagement_types | text[] | NO | HIGH | project/retainer/full-time/advisory |
| pricing_model | enum | NO | MEDIUM | hourly/project/monthly/equity |
| pricing_min | numeric | NO | HIGH | Budget filter signal |
| pricing_max | numeric | NO | HIGH | Budget filter signal |
| pricing_currency | text | NO | LOW | Default INR |
| min_project_size | numeric | NO | MEDIUM | Minimum engagement value |

### Section 5 — What You Are Looking For
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| seeking | text[] | YES | CRITICAL | What they want: clients/cofounder/job/investment/mentor |
| ideal_collaboration | text | NO | CRITICAL | Describe ideal collaborator — embedded |
| ideal_client_profile | text | NO | CRITICAL | ICP description — embedded |
| open_to_hiring | boolean | NO | HIGH | Hiring signal |
| open_to_investment | boolean | NO | HIGH | Fundraising signal |
| open_to_mentorship | boolean | NO | HIGH | Mentorship signal |
| open_to_cofounder | boolean | NO | HIGH | Co-founder search signal |
| opportunity_types | text[] | NO | HIGH | freelance/fulltime/advisory/partnership |

### Section 6 — Startup / Business Information (Conditional)
*Show only if profile_type is Founder/Startup/Business Owner/Company*
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| company_name | text | YES* | HIGH | Legal or brand name |
| company_description | text | YES* | CRITICAL | What the company does — embedded |
| founding_year | int | NO | MEDIUM | Company age |
| team_size | text | NO | MEDIUM | 1/2-10/11-50/51-200/200+ |
| funding_stage | enum | NO | HIGH | bootstrapped/pre-seed/seed/series-a/etc |
| funding_raised | numeric | NO | MEDIUM | Total raised |
| annual_revenue | enum | NO | MEDIUM | Revenue band |
| business_model | text[] | NO | HIGH | B2B/B2C/SaaS/marketplace/etc |
| target_market | text | NO | CRITICAL | Who they serve — embedded |
| usp | text | NO | CRITICAL | Unique value proposition — embedded |
| website | text | NO | MEDIUM | Company website |
| product_stage | enum | NO | HIGH | idea/mvp/launched/scaling |
| looking_for_from_ecosystem | text[] | NO | CRITICAL | What help they need |

### Section 7 — Investor Information (Conditional)
*Show only if profile_type is Investor*
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| investor_type | enum | YES* | HIGH | angel/vc/family-office/corporate/govt |
| investment_thesis | text | YES* | CRITICAL | What they invest in — embedded |
| preferred_stages | text[] | YES* | HIGH | Pre-seed/seed/series-a |
| preferred_sectors | text[] | YES* | CRITICAL | Sectors — embedded |
| check_size_min | numeric | NO | HIGH | Min ticket size |
| check_size_max | numeric | NO | HIGH | Max ticket size |
| portfolio_companies | text[] | NO | MEDIUM | Notable investments |
| investment_geography | text[] | NO | MEDIUM | Where they invest |

### Section 8 — Job Seeker / Student (Conditional)
*Show if profile_type is Job Seeker/Student/Intern*
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| education_level | enum | NO | MEDIUM | high-school/bachelors/masters/phd |
| field_of_study | text | NO | HIGH | Degree subject — embedded |
| current_institution | text | NO | MEDIUM | College/university |
| graduation_year | int | NO | MEDIUM | Expected or completed |
| seeking_role_type | text[] | YES* | CRITICAL | internship/full-time/part-time/contract |
| preferred_roles | text[] | YES* | CRITICAL | Job titles they want |
| preferred_locations | text[] | NO | HIGH | Cities they're open to |
| notice_period | text | NO | MEDIUM | Immediate/1-month/2-months |
| current_ctc | numeric | NO | LOW | Optional |
| expected_ctc | numeric | NO | MEDIUM | Salary expectation |
| resume_url | text | NO | HIGH | Cloudinary URL |

### Section 9 — Links & Portfolio
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| linkedin_url | text | NO | HIGH | Trust signal |
| twitter_url | text | NO | LOW | Social presence |
| github_url | text | NO | HIGH | For developers |
| instagram_url | text | NO | LOW | For creators |
| youtube_url | text | NO | LOW | For creators |
| behance_url | text | NO | MEDIUM | For designers |
| dribbble_url | text | NO | MEDIUM | For designers |
| personal_website | text | NO | MEDIUM | Portfolio site |
| portfolio_urls | text[] | NO | HIGH | Work samples |

### Section 10 — AI Discovery Optimization
*This section is power-user / auto-generated*
| Field | Type | Required | AI Importance | Notes |
|---|---|---|---|---|
| search_keywords | text[] | NO | CRITICAL | User-defined discovery tags |
| ai_summary | text | NO | CRITICAL | Auto-generated by Aishwarya |
| strengths | text[] | NO | HIGH | Top 5 strengths |
| achievements | text[] | NO | HIGH | Key accomplishments |
| unique_about_me | text | NO | CRITICAL | What makes them different — embedded |
| collaboration_style | text | NO | MEDIUM | How they work |
| not_looking_for | text[] | NO | HIGH | Negative signal for better matching |

---

## PHASE 4: AI RETRIEVAL OPTIMIZATION

### Embedding Strategy — Profile Embedding Text Construction

**Tier 1 — Core (always embedded, high weight):**
```
{display_name} is a {profile_type} based in {city}, {country}.
{tagline}
{bio}
{professional_summary}
Domain expertise: {domain_expertise}
Skills: {skills}
Industries: {industries_worked_in}
Problems solved: {problems_you_solve}
```

**Tier 2 — Service context (embedded for providers):**
```
Services offered: {services_offered}
Engagement types: {engagement_types}
Pricing: {pricing_model} starting from {pricing_min}
Ideal client: {ideal_client_profile}
```

**Tier 3 — Opportunity context (embedded for seekers):**
```
Looking for: {seeking}
Open to: {opportunity_types}
Ideal collaboration: {ideal_collaboration}
Preferred roles: {preferred_roles}
```

**Tier 4 — Business context (embedded for founders):**
```
Company: {company_name} — {company_description}
Stage: {funding_stage}
Target market: {target_market}
USP: {usp}
Looking for from ecosystem: {looking_for_from_ecosystem}
```

**Tier 5 — Discovery optimization:**
```
Keywords: {search_keywords}
Unique: {unique_about_me}
Achievements: {achievements}
```

### Field-by-Field Retrieval Decision:
| Field | Embed | Keyword Index | Filter | Rank Signal |
|---|---|---|---|---|
| tagline | YES | YES | NO | NO |
| bio | YES | NO | NO | NO |
| skills | YES | YES | YES | NO |
| domain_expertise | YES | YES | YES | NO |
| industries | YES | YES | YES | NO |
| problems_you_solve | YES | NO | NO | NO |
| services_offered | YES | YES | YES | NO |
| city | NO | NO | YES | NO |
| availability_status | NO | NO | YES | YES |
| verification_tier | NO | NO | NO | YES |
| pricing_min/max | NO | NO | YES | NO |
| is_premium | NO | NO | NO | YES |
| acceptance_rate | NO | NO | NO | YES |
| profile_completeness | NO | NO | NO | YES |
| open_to_* fields | NO | NO | YES | NO |
| seeking | YES | YES | NO | NO |
| investment_thesis | YES | NO | NO | NO |
| funding_stage | NO | NO | YES | NO |
| team_size | NO | NO | YES | NO |

---

## PHASE 5: DATABASE IMPACT — Schema Changes Required

### Decision: EXTEND existing tables + ADD new tables

**Do NOT recreate profiles table** — extend it.
**Add 6 new tables** — work_experience, education, portfolio_items, certifications, skills_master, profile_analytics.

### profiles table — new columns to ADD:

```sql
-- Extended profile type (replacing narrow enum)
display_name              text
profile_type              text  -- replaces 'category' enum
profile_sub_types         text[]
headline                  text
professional_summary      text

-- Location extended  
state                     text
pin_code                  text
timezone                  text
hours_per_week            int

-- Professional
years_of_experience       int
current_role              text
current_organization      text
domain_expertise          text[]
tools_and_technologies    text[]
industries_interested_in  text[]

-- What you offer (extended)
products_offered          text[]
engagement_types          text[]
pricing_currency          text DEFAULT 'INR'
min_project_size          numeric

-- What you seek
seeking                   text[]
ideal_collaboration       text
ideal_client_profile      text
open_to_hiring            boolean DEFAULT false
open_to_investment        boolean DEFAULT false
open_to_mentorship        boolean DEFAULT false
open_to_cofounder         boolean DEFAULT false
opportunity_types         text[]

-- Startup fields
company_name              text
company_description       text
founding_year             int
team_size                 text
funding_stage             text
funding_raised            numeric
annual_revenue            text
business_model            text[]
target_market             text
usp                       text
product_stage             text
looking_for_from_ecosystem text[]

-- Investor fields
investor_type             text
investment_thesis         text
preferred_stages          text[]
preferred_sectors         text[]
check_size_min            numeric
check_size_max            numeric
portfolio_companies       text[]
investment_geography      text[]

-- Job seeker fields
education_level           text
field_of_study            text
current_institution       text
graduation_year           int
seeking_role_type         text[]
preferred_roles           text[]
preferred_locations       text[]
notice_period             text
expected_ctc              numeric
resume_url                text

-- Social links (extended from jsonb to explicit columns)
linkedin_url              text
twitter_url               text
github_url                text
instagram_url             text
youtube_url               text
behance_url               text
dribbble_url              text

-- AI optimization
search_keywords           text[]
ai_summary                text
strengths                 text[]
achievements              text[]
unique_about_me           text
collaboration_style       text
not_looking_for           text[]

-- Completeness
profile_completeness      int DEFAULT 0  -- 0-100 score
onboarding_completed      boolean DEFAULT false
onboarding_step           int DEFAULT 0
```

---

## PHASE 6: COMPLETE SQL MIGRATION

See file: align_migration.sql (delivered separately)

---

## PHASE 7: PROFILE COMPLETENESS SCORING SYSTEM

### Scoring Algorithm (100 points total):

| Section | Max Points | Fields |
|---|---|---|
| Identity | 15 | display_name(3) + tagline(5) + bio(7) |
| Location | 10 | city(5) + country(3) + availability(2) |
| Professional | 20 | headline(5) + summary(5) + skills(5) + domain(5) |
| Offer | 20 | services/products(10) + problems_solved(10) |
| Seeking | 10 | seeking(5) + ideal_collab(5) |
| Links | 10 | linkedin(4) + website(3) + portfolio(3) |
| AI optimization | 10 | keywords(5) + unique_about_me(5) |
| Verification | 5 | tier bonus |

### Score thresholds:
- 0-30: Incomplete — not shown in search results
- 31-60: Basic — shown with "incomplete" label
- 61-80: Good — shown normally
- 81-100: Excellent — eligible for featured placement

---

## PHASE 8: VERIFICATION WORKFLOW

### Tier 0 — Phone Verified (automatic)
- WhatsApp number confirmed via OTP
- Access: basic profile, 2 leads/month
- Badge: none

### Tier 1 — Profile Verified (manual review)
- LinkedIn URL confirmed active
- Profile completeness > 60%
- Admin reviews in 24 hours
- Access: 10 leads/month, "Verified" badge
- Trigger: user requests verification

### Tier 2 — Identity Verified (document review)
- Government ID submitted via Cloudinary upload
- GST or company registration (for businesses)
- Admin reviews in 48 hours
- Access: unlimited leads, "Identity Verified" badge, priority ranking

### Tier 3 — Background Checked (future)
- Third-party background check API
- Reserved for high-trust categories (investors, legal, medical)

---

## PHASE 9: ADMIN REVIEW WORKFLOW

### Profile Review Queue:
1. New profile created → status: pending_review
2. Admin dashboard shows queue sorted by completeness score
3. Admin reviews: approve / reject / request_changes
4. On approve: is_active = true, embedding generated, user notified
5. On reject: user notified with reason, can resubmit
6. On request_changes: user notified with specific fields to fix

### Verification Review Queue:
1. User submits docs → verification_requests table
2. Admin notified via WhatsApp
3. Admin reviews docs in Supabase dashboard
4. Approves tier → profile verification_tier updated → user notified

### Lead Quality Review:
1. Weekly automated report: lead acceptance rate by category
2. Low-performing profiles (< 20% acceptance) flagged for review
3. Admin can deactivate or contact provider

---

## PHASE 10: WHATSAPP ONBOARDING FLOW (Aishwarya-driven)

### Flow 1 — Quick Registration (5 minutes):
```
User: "Register my profile"
Aishwarya: "What's your name?"
User: "Rahul Sharma"
Aishwarya: "What do you do in one line?"
User: "I build WhatsApp chatbots for businesses"
Aishwarya: "What's your primary role? 
  1. Freelancer  2. Agency  3. Developer
  4. Consultant  5. Startup  6. Other"
...continues collecting 8 core fields...
Aishwarya: "Your basic profile is live! 
  Complete your full profile at: align.network/profile/rahul
  Full profiles get 5x more leads. 🚀"
```

### Flow 2 — Deep Profile (web form):
- WhatsApp collects 8 core fields
- Sends web link for complete onboarding form
- Web form covers all 10 sections
- Profile completeness score shown in real-time

---

## SUMMARY — Implementation Priority

**Immediate (do now):**
1. Run align_migration.sql to extend profiles table
2. Update buildProfileEmbeddingText() to use new rich fields
3. Update conversationEngine to handle new profile types
4. Add profile completeness scoring function

**Phase 2 (next sprint):**
1. Build work_experience, education, portfolio_items tables
2. Web-based onboarding form (React)
3. Admin dashboard
4. Skills master table with taxonomy

**Phase 3 (scale):**
1. Profile connections / networking graph
2. Saved searches
3. Advanced analytics
4. API for third-party integrations

