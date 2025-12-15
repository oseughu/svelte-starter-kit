export type FormErrors = Record<string, string>;

export interface BaseFormSnippetProps {
    errors: FormErrors;
    processing: boolean;
}

export interface ProfileFormSnippetProps extends BaseFormSnippetProps {
    recentlySuccessful: boolean;
}
