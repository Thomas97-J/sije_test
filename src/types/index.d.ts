type UnsplashImage = {
  alt_description: string;
  alternative_slugs: {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    [key: string]: string; // 다른 언어에 대한 지원을 위해 추가
  };
  asset_type: string;
  blur_hash: string;
  breadcrumbs: string[];
  color: string;
  created_at: string;
  current_user_collections: any[]; // 구체적인 타입이 필요하면 추가
  description: string;
  downloads: number;
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    [key: string]: any; // 필요에 따라 추가
  };
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  location: {
    name: string | null;
    city: string | null;
    country: string | null;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  promoted_at: string;
  slug: string;
  sponsorship: any | null; // 구체적인 타입이 필요하면 추가
  topic_submissions: {
    [key: string]: any; // 구체적인 타입이 필요하면 추가
  };
  updated_at: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    [key: string]: string; // 다른 URL 사이즈에 대한 지원을 위해 추가
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    [key: string]: any; // 필요에 따라 추가
  };
  views: number;
  width: number;
};
