<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VerificationNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_verification_notification_can_be_sent(): void
    {
        $user = User::factory()->unverified()->create();

        $response = $this->actingAs($user)->post(route('verification.send'));

        $response->assertSessionHas('status', 'verification-link-sent');
    }

    public function test_verified_user_is_redirected_when_requesting_verification_link(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('verification.send'));

        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
