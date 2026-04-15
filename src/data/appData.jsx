export const items = [
  {
    id: 'home',
    label: 'الرئيسية',
    title: 'الصفحة الرئيسية',
    description: 'متابعة فورية للشحنات والحالات الحرجة من واجهة واحدة.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 3.2 3.8 9.7a1 1 0 0 0-.38.79v9.01c0 .83.67 1.5 1.5 1.5h4.26a.75.75 0 0 0 .75-.75v-4.38c0-.83.67-1.5 1.5-1.5h1.14c.83 0 1.5.67 1.5 1.5v4.38c0 .41.34.75.75.75h4.26c.83 0 1.5-.67 1.5-1.5v-9.01a1 1 0 0 0-.38-.79L12 3.2Z" />
      </svg>
    ),
  },
  {
    id: 'shipments',
    label: 'الشحنات',
    title: 'إدارة الشحنات',
    description: 'متابعة حالة الشحنات والتنبيهات الحرارية والمسارات بشكل احترافي.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M2.75 6.75h10.5v9.5H2.75z" />
        <path d="M13.25 9.25h3.53l2.47 2.75v4.25h-6" />
        <path d="M16.5 9.25v2.75h2.98" />
        <circle cx="7" cy="18.25" r="1.75" />
        <circle cx="17.5" cy="18.25" r="1.75" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: 'الخريطة',
    title: 'الخريطة',
    description: 'استعراض المسارات ونقاط الوصول وتوزيع الشحنات على الخريطة.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M3.75 6.5 9 4.25l6 2.25 5.25-2.25v13.25L15 19.75 9 17.5l-5.25 2.25z" />
        <path d="M9 4.25V17.5" />
        <path d="M15 6.5v13.25" />
        <path d="M14.9 9.2a2.9 2.9 0 1 0-5.8 0c0 2.57 2.9 5.1 2.9 5.1s2.9-2.53 2.9-5.1Z" />
        <circle cx="12" cy="9.2" r=".8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'info',
    label: 'المعلومات',
    title: 'المعلومات',
    description: 'بيانات تشغيلية وملخص لحالات الشحن ومستوى الأداء.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.25" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.25" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.25" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.25" />
      </svg>
    ),
  },
]

export const shipmentFilters = ['عرض الكل', 'الخطرة', 'الآمنة']

export const shipmentCards = [
  {
    id: 217,
    tone: 'danger',
    tag: 'تنبيه خطر',
    risk: 'خطر مرتفع',
    timeLeft: 'الوقت المتبقي: ٤٥ دقيقة',
    temperature: '40.2°C',
    route: 'جازان - الرياض',
    market: 'السوق المركزي',
    quantity: 'الكمية: 132 صندوق',
    warning: 'تحذير بتجاوز الحد المسموح للحرارة (+4°م)',
    driver: 'عبدالله ناصر',
    status: 'تحتاج تدخل سريع',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 184,
    tone: 'warning',
    tag: 'مراقبة نشطة',
    risk: 'مستوى حرارة متذبذب',
    timeLeft: 'آخر تحديث: قبل ٨ دقائق',
    temperature: '7.8°C',
    route: 'جدة - القصيم',
    market: 'مخزن التوزيع',
    quantity: 'الكمية: 86 صندوق',
    warning: 'يُنصح بفحص وحدة التبريد خلال الرحلة الحالية',
    driver: 'سالم فهد',
    status: 'تحت المراقبة',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 305,
    tone: 'safe',
    tag: 'شحنة آمنة',
    risk: 'حالة مستقرة',
    timeLeft: 'آخر تحديث: قبل دقيقتين',
    temperature: '3.9°C',
    route: 'الدمام - حائل',
    market: 'مركز التبريد الشرقي',
    quantity: 'الكمية: 64 صندوق',
    warning: 'كل القراءات ضمن النطاق المسموح ولا توجد تنبيهات حالية',
    driver: 'محمد ياسر',
    status: 'تسير بشكل طبيعي',
    avatar:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 412,
    tone: 'safe',
    tag: 'تم التسليم',
    risk: 'نتيجة إيجابية',
    timeLeft: 'اكتملت الرحلة: اليوم 11:20 ص',
    temperature: '4.1°C',
    route: 'ينبع - الرياض',
    market: 'مستودع الساحل',
    quantity: 'الكمية: 48 صندوق',
    warning: 'تم التسليم بنجاح مع الحفاظ على درجة الحرارة طوال الرحلة',
    driver: 'تركي سعد',
    status: 'مغلقة بنجاح',
    avatar:
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=240&q=80',
  },
]

export const trackingSteps = [
  { label: 'نقطة الانطلاق', active: true },
  { label: 'نقطة توقف', active: true },
  { label: 'نقطة توقف', active: false },
  { label: 'نقطة الوصول', active: false },
]
