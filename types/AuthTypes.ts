declare type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

declare type AuthBackButtonProps = {
  label: string;
  href: string;
}

declare type AuthCardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backbuttonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

declare type AuthHeaderProps = {
  label: string;
};

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare type AuthInfoMessageProps = {
  message: string;
  type: "error" | "success";
};

declare type AuthSignInProps = {
  email: string;
  password: string;
}

declare type AuthSignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  email: string;
  password: string;
};