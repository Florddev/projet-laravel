import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        tag: user.tag,
        bio: user.bio,
        email: user.email,
        avatar: null,
        banner: null,
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setData('avatar', file);
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        setData('banner', file);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('tag', data.tag);
        formData.append('email', data.email);
        formData.append('bio', data.bio);

        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }

        if (data.banner) {
            formData.append('banner', data.banner);
        }

        post(route('profile.update'), {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                console.log('Profile updated successfully');
            },
            onError: (error) => {
                console.error('Error updating profile:', error);
            }
        });
    };

    return (
        <section className={className}>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your account's profile information and email address.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="bio">Bio</Label>

                        <Textarea
                            id="bio"
                            className="mt-1 block w-full"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            isFocused
                        />

                        <InputError className="mt-2" message={errors.bio} />
                    </div>

                    <div>
                        <Label htmlFor="tag">Tag</Label>

                        <Input
                            id="tag"
                            className="mt-1 block w-full"
                            value={data.tag}
                            onChange={(e) => setData('tag', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.tag} />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <Label htmlFor="banner">Banner</Label>

                        <Input
                            id="banner"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={handleBannerChange}
                        />

                        <InputError className="mt-2" message={errors.banner} />
                    </div>

                    <div>
                        <Label htmlFor="avatar">Avatar</Label>

                        <Input
                            id="avatar"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={handleAvatarChange}
                        />

                        <InputError className="mt-2" message={errors.avatar} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </section>
    );
}