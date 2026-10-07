<?php

return [
    'login' => 'resources/js/pages/auth/Login.svelte',
    'register' => 'resources/js/pages/auth/Register.svelte',
    'welcome' => 'resources/js/pages/Welcome.svelte',
    'profile' => 'resources/js/pages/settings/Profile.svelte',
    'security' => 'resources/js/pages/settings/Security.svelte',
    'verify_email' => 'resources/js/pages/auth/VerifyEmail.svelte',
    'two_factor_challenge' => 'resources/js/pages/auth/TwoFactorChallenge.svelte',
    'confirm_password' => 'resources/js/pages/auth/ConfirmPassword.svelte',
    'auth_types' => 'resources/js/types/auth.ts',

    'two_factor_files' => [
        'resources/js/components/ManageTwoFactor.svelte',
        'resources/js/components/TwoFactorSetupModal.svelte',
        'resources/js/components/TwoFactorRecoveryCodes.svelte',
        'resources/js/components/ui/input-otp/index.ts',
        'resources/js/components/ui/input-otp/context.ts',
        'resources/js/components/ui/input-otp/InputOTP.svelte',
        'resources/js/components/ui/input-otp/InputOTPGroup.svelte',
        'resources/js/components/ui/input-otp/InputOTPSeparator.svelte',
        'resources/js/components/ui/input-otp/InputOTPSlot.svelte',
        'resources/js/lib/twoFactorAuth.svelte.ts',
    ],

    'two_factor_otp_package' => null,

    'passkey_files' => [
        'resources/js/components/PasskeyItem.svelte',
        'resources/js/components/ManagePasskeys.svelte',
        'resources/js/components/PasskeyRegister.svelte',
        'resources/js/components/PasskeyVerify.svelte',
    ],
];
