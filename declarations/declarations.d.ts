declare module "*.css" {
  const styles: { [className: string]: string };
  export = styles;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: React.FunctionComponent<{
    size?: "tiny" | "small" | "medium" | "large";
    className?: string;
  }>;
  export default content;
}

declare const BACKEND_HOST: string;

// Augment Express Request to include Canva-specific properties
declare module "express-serve-static-core" {
  interface Request {
    canva: {
      appId: string;
      userId: string;
      brandId: string;
    };
  }
}
