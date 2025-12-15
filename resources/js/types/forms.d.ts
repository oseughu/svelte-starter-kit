export type FormErrors = Record<string, string>;

export interface BaseFormSnippetProps {
    errors: FormErrors;
    processing: boolean;
}

export interface ProfileFormSnippetProps extends BaseFormSnippetProps {
    recentlySuccessful: boolean;
}

export interface AuthFormSnippetProps extends BaseFormSnippetProps {
    clearErrors?: () => void;
}

export interface DeleteFormSnippetProps extends BaseFormSnippetProps {
    reset: () => void;
    clearErrors: () => void;
}