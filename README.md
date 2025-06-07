Based on the main page content and SRC functionality, here's a comprehensive site structure with page flows:

## 📋 **Complete Site Structure**

### **1. Public Pages (No Authentication Required)**

```plaintext
📁 app/
├── 📄 page.tsx (Homepage)
├── 📁 about/
│   ├── 📄 page.tsx (About SRC)
│   ├── 📁 vision-mission/
│   │   └── 📄 page.tsx (Vision & Mission Details)
│   ├── 📁 history/
│   │   └── 📄 page.tsx (SRC History)
│   └── 📁 constitution/
│       └── 📄 page.tsx (SRC Constitution)
├── 📁 executives/
│   ├── 📄 page.tsx (All Executives)
│   ├── 📁 [slug]/
│   │   └── 📄 page.tsx (Individual Executive Profile)
│   └── 📁 committees/
│       └── 📄 page.tsx (Committee Structure)
├── 📁 news/
│   ├── 📄 page.tsx (News Listing)
│   ├── 📁 [slug]/
│   │   └── 📄 page.tsx (Individual News Article)
│   └── 📁 category/
│       └── 📁 [category]/
│           └── 📄 page.tsx (News by Category)
├── 📁 events/
│   ├── 📄 page.tsx (Events Calendar)
│   ├── 📁 [slug]/
│   │   └── 📄 page.tsx (Event Details)
│   ├── 📁 past/
│   │   └── 📄 page.tsx (Past Events)
│   └── 📁 register/
│       └── 📁 [eventId]/
│           └── 📄 page.tsx (Event Registration)
├── 📁 services/
│   ├── 📄 page.tsx (All Services)
│   ├── 📁 permits/
│   │   ├── 📄 page.tsx (Permit Information)
│   │   ├── 📁 request/
│   │   │   └── 📄 page.tsx (Permit Request Form)
│   │   └── 📁 status/
│   │       └── 📄 page.tsx (Check Permit Status)
│   ├── 📁 welfare/
│   │   ├── 📄 page.tsx (Student Welfare)
│   │   ├── 📁 counseling/
│   │   │   └── 📄 page.tsx (Counseling Services)
│   │   ├── 📁 financial-aid/
│   │   │   └── 📄 page.tsx (Financial Assistance)
│   │   └── 📁 health/
│   │       └── 📄 page.tsx (Health Services)
│   ├── 📁 grievance/
│   │   ├── 📄 page.tsx (Grievance Portal)
│   │   └── 📁 submit/
│   │       └── 📄 page.tsx (Submit Grievance)
│   └── 📁 academic/
│       ├── 📄 page.tsx (Academic Support)
│       ├── 📁 appeals/
│       │   └── 📄 page.tsx (Academic Appeals)
│       └── 📁 representation/
│           └── 📄 page.tsx (Student Representation)
├── 📁 resources/
│   ├── 📄 page.tsx (All Resources)
│   ├── 📁 handbook/
│   │   └── 📄 page.tsx (Student Handbook)
│   ├── 📁 forms/
│   │   └── 📄 page.tsx (Downloadable Forms)
│   ├── 📁 policies/
│   │   └── 📄 page.tsx (University Policies)
│   ├── 📁 calendar/
│   │   └── 📄 page.tsx (Academic Calendar)
│   └── 📁 faq/
│       └── 📄 page.tsx (Frequently Asked Questions)
├── 📁 get-involved/
│   ├── 📄 page.tsx (How to Get Involved)
│   ├── 📁 committees/
│   │   ├── 📄 page.tsx (Join Committees)
│   │   └── 📁 apply/
│   │       └── 📄 page.tsx (Committee Application)
│   ├── 📁 volunteer/
│   │   ├── 📄 page.tsx (Volunteer Opportunities)
│   │   └── 📁 register/
│   │       └── 📄 page.tsx (Volunteer Registration)
│   ├── 📁 elections/
│   │   ├── 📄 page.tsx (Election Information)
│   │   ├── 📁 candidates/
│   │   │   └── 📄 page.tsx (Candidate Profiles)
│   │   └── 📁 vote/
│   │       └── 📄 page.tsx (Voting Portal)
│   └── 📁 feedback/
│       └── 📄 page.tsx (Submit Feedback)
├── 📁 contact/
│   ├── 📄 page.tsx (Contact Information)
│   ├── 📁 offices/
│   │   └── 📄 page.tsx (Office Locations)
│   └── 📁 emergency/
│       └── 📄 page.tsx (Emergency Contacts)
└── 📁 search/
    └── 📄 page.tsx (Site Search Results)
```

### **2. Student Portal (Authentication Required)**

```plaintext
📁 app/
├── 📁 portal/
│   ├── 📄 layout.tsx (Portal Layout with Auth)
│   ├── 📄 page.tsx (Dashboard)
│   ├── 📁 profile/
│   │   ├── 📄 page.tsx (Student Profile)
│   │   └── 📁 edit/
│   │       └── 📄 page.tsx (Edit Profile)
│   ├── 📁 permits/
│   │   ├── 📄 page.tsx (My Permits)
│   │   ├── 📁 history/
│   │   │   └── 📄 page.tsx (Permit History)
│   │   └── 📁 download/
│   │       └── 📁 [permitId]/
│   │           └── 📄 page.tsx (Download Permit)
│   ├── 📁 payments/
│   │   ├── 📄 page.tsx (Payment History)
│   │   ├── 📁 dues/
│   │   │   └── 📄 page.tsx (SRC Dues Payment)
│   │   └── 📁 receipts/
│   │       └── 📄 page.tsx (Download Receipts)
│   ├── 📁 events/
│   │   ├── 📄 page.tsx (My Events)
│   │   └── 📁 registered/
│   │       └── 📄 page.tsx (Registered Events)
│   ├── 📁 grievances/
│   │   ├── 📄 page.tsx (My Grievances)
│   │   └── 📁 [grievanceId]/
│   │       └── 📄 page.tsx (Grievance Details)
│   ├── 📁 notifications/
│   │   └── 📄 page.tsx (Notifications)
│   └── 📁 settings/
│       └── 📄 page.tsx (Account Settings)
```

### **3. Admin Panel (Admin Authentication Required)**

```plaintext
📁 app/
├── 📁 admin/
│   ├── 📄 layout.tsx (Admin Layout)
│   ├── 📄 page.tsx (Admin Dashboard)
│   ├── 📁 content/
│   │   ├── 📁 news/
│   │   │   ├── 📄 page.tsx (Manage News)
│   │   │   ├── 📁 create/
│   │   │   │   └── 📄 page.tsx (Create News)
│   │   │   └── 📁 edit/
│   │   │       └── 📁 [id]/
│   │   │           └── 📄 page.tsx (Edit News)
│   │   ├── 📁 events/
│   │   │   ├── 📄 page.tsx (Manage Events)
│   │   │   ├── 📁 create/
│   │   │   │   └── 📄 page.tsx (Create Event)
│   │   │   └── 📁 edit/
│   │   │       └── 📁 [id]/
│   │   │           └── 📄 page.tsx (Edit Event)
│   │   └── 📁 pages/
│   │       └── 📄 page.tsx (Manage Static Pages)
│   ├── 📁 permits/
│   │   ├── 📄 page.tsx (Permit Management)
│   │   ├── 📁 pending/
│   │   │   └── 📄 page.tsx (Pending Permits)
│   │   └── 📁 approved/
│   │       └── 📄 page.tsx (Approved Permits)
│   ├── 📁 students/
│   │   ├── 📄 page.tsx (Student Management)
│   │   └── 📁 [studentId]/
│   │       └── 📄 page.tsx (Student Details)
│   ├── 📁 grievances/
│   │   ├── 📄 page.tsx (Grievance Management)
│   │   └── 📁 [grievanceId]/
│   │       └── 📄 page.tsx (Grievance Details)
│   ├── 📁 analytics/
│   │   └── 📄 page.tsx (Site Analytics)
│   └── 📁 settings/
│       └── 📄 page.tsx (System Settings)
```

## 🔄 **User Flow Diagrams**

### **1. Student Permit Request Flow**

```plaintext
Homepage → Services → Permits → Request Permit → 
Login/Register → Fill Form → Payment → Confirmation → 
Portal Dashboard → Download Permit
```

### **2. Event Registration Flow**

```plaintext
Homepage → Events → Event Details → Register → 
Login/Register → Registration Form → Confirmation → 
Portal → My Events → Event Ticket
```

### **3. Grievance Submission Flow**

```plaintext
Homepage → Services → Grievance Portal → Submit Grievance → 
Login/Register → Grievance Form → Submit → 
Portal → My Grievances → Track Status
```

### **4. News/Information Flow**

```plaintext
Homepage → News → Category/Article → 
Related Articles → Newsletter Signup → 
Social Media Share
```

## 📱 **Page Descriptions & Functionality**

### **Core Public Pages**

| Page | Purpose | Key Features
|-----|-----|-----
| **Homepage** | Main landing page | Hero, quick links, latest news, events preview
| **About SRC** | Organization information | History, mission, structure, achievements
| **Executives** | Leadership profiles | Executive bios, contact info, responsibilities
| **News** | Information hub | Articles, announcements, search, categories
| **Events** | Event management | Calendar, registration, past events
| **Services** | Student services | Permits, welfare, grievances, academic support
| **Resources** | Document library | Forms, policies, handbook, FAQ
| **Contact** | Communication | Office locations, contacts, emergency info


### **Student Portal Features**

| Section | Purpose | Key Features
|-----|-----|-----
| **Dashboard** | Personal overview | Quick stats, recent activity, notifications
| **Profile** | Account management | Personal info, academic details, preferences
| **Permits** | Permit management | Request, track, download, history
| **Payments** | Financial tracking | Dues payment, receipts, transaction history
| **Events** | Event management | Registered events, tickets, calendar sync
| **Grievances** | Issue tracking | Submit complaints, track resolution


### **Admin Panel Features**

| Section | Purpose | Key Features
|-----|-----|-----
| **Content Management** | Site content | Create/edit news, events, pages
| **Permit Management** | Process permits | Approve/reject, bulk operations
| **Student Management** | User administration | Student records, account management
| **Analytics** | Performance tracking | Usage stats, popular content, user behavior
| **System Settings** | Configuration | Site settings, user roles, permissions


## 🎯 **Key User Journeys**

### **New Student Journey**

1. **Discovery**: Homepage → About SRC → Services
2. **Registration**: Create account → Verify email
3. **First Service**: Request permit → Payment → Download
4. **Engagement**: Join committee → Attend events → Provide feedback


### **Returning Student Journey**

1. **Quick Access**: Login → Dashboard → Recent activity
2. **Service Usage**: Request permit → Track status → Download
3. **Information**: Check news → Event registration → Resource download


### **Admin Journey**

1. **Content Management**: Login → Create news → Publish → Monitor engagement
2. **Service Management**: Review permits → Approve/reject → Send notifications
3. **Analytics**: Check dashboard → Generate reports → Plan improvements


This structure provides a comprehensive, user-friendly website that serves all stakeholders while maintaining clear navigation and efficient workflows.