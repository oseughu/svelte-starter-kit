<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PragmaRX\Google2FA\Google2FA;
use Tests\TestCase;

class TwoFactorAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function confirmPassword(User $user): void
    {
        $this->post('/user/confirm-password', [
            'password' => 'password',
        ]);
    }

    public function test_two_factor_settings_page_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);
        $this->confirmPassword($user);

        $response = $this->get(route('two-factor.show'));

        $response->assertOk();
    }

    public function test_two_factor_authentication_can_be_enabled(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);
        $this->confirmPassword($user);

        $response = $this->post('/user/two-factor-authentication');

        $response->assertRedirect();

        $user->refresh();
        $this->assertNotNull($user->two_factor_secret);
    }

    public function test_two_factor_authentication_can_be_confirmed(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);
        $this->confirmPassword($user);

        $this->post('/user/two-factor-authentication');

        $user->refresh();

        $google2fa = new Google2FA;
        $validCode = $google2fa->getCurrentOtp(decrypt($user->two_factor_secret));

        $response = $this->post('/user/confirmed-two-factor-authentication', [
            'code' => $validCode,
        ]);

        $response->assertRedirect();

        $user->refresh();
        $this->assertNotNull($user->two_factor_confirmed_at);
    }

    public function test_two_factor_authentication_can_be_disabled(): void
    {
        $user = User::factory()->withTwoFactor()->create();

        $this->actingAs($user);
        $this->confirmPassword($user);

        $response = $this->delete('/user/two-factor-authentication');

        $response->assertRedirect();

        $user->refresh();
        $this->assertNull($user->two_factor_secret);
        $this->assertNull($user->two_factor_confirmed_at);
    }

    public function test_recovery_codes_can_be_regenerated(): void
    {
        $user = User::factory()->withTwoFactor()->create();

        $originalCodes = json_decode(decrypt($user->two_factor_recovery_codes), true);

        $this->actingAs($user);
        $this->confirmPassword($user);

        $response = $this->post('/user/two-factor-recovery-codes');

        $response->assertRedirect();

        $user->refresh();
        $newCodes = json_decode(decrypt($user->two_factor_recovery_codes), true);

        $this->assertNotEquals($originalCodes, $newCodes);
    }
}
