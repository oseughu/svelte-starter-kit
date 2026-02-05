<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PragmaRX\Google2FA\Google2FA;
use Tests\TestCase;

class TwoFactorChallengeTest extends TestCase
{
    use RefreshDatabase;

    public function test_two_factor_challenge_screen_can_be_rendered(): void
    {
        $user = User::factory()->withTwoFactor()->create();

        $this->session(['login.id' => $user->id]);

        $response = $this->get('/two-factor-challenge');

        $response->assertOk();
    }

    public function test_user_can_authenticate_with_valid_code(): void
    {
        $google2fa = new Google2FA;
        $secret = $google2fa->generateSecretKey();
        $validCode = $google2fa->getCurrentOtp($secret);

        $user = User::factory()->create([
            'two_factor_secret' => encrypt($secret),
            'two_factor_recovery_codes' => encrypt(json_encode(['recovery-code-1', 'recovery-code-2'])),
            'two_factor_confirmed_at' => now(),
        ]);

        $this->session(['login.id' => $user->id]);

        $response = $this->post('/two-factor-challenge', [
            'code' => $validCode,
        ]);

        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertAuthenticatedAs($user);
    }

    public function test_user_can_authenticate_with_recovery_code(): void
    {
        $user = User::factory()->withTwoFactor()->create();

        $this->session(['login.id' => $user->id]);

        $response = $this->post('/two-factor-challenge', [
            'recovery_code' => 'recovery-code-1',
        ]);

        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_authenticate_with_invalid_code(): void
    {
        $user = User::factory()->withTwoFactor()->create();

        $this->session(['login.id' => $user->id]);

        $response = $this->post('/two-factor-challenge', [
            'code' => '000000',
        ]);

        $response->assertSessionHasErrors('code');
        $this->assertGuest();
    }

    public function test_user_cannot_authenticate_with_invalid_recovery_code(): void
    {
        $user = User::factory()->withTwoFactor()->create();

        $this->session(['login.id' => $user->id]);

        $response = $this->post('/two-factor-challenge', [
            'recovery_code' => 'invalid-recovery-code',
        ]);

        $response->assertSessionHasErrors('recovery_code');
        $this->assertGuest();
    }
}
