<?php

namespace Laravel\WorkOS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;

class AuthKitAccountDeletionRequest extends FormRequest
{
    public function delete(callable $using): RedirectResponse
    {
        $using($this->user());

        return redirect('/');
    }

    public function rules(): array
    {
        return [];
    }
}
