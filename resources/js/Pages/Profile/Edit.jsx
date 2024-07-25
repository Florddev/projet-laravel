import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { Card } from "@/Components/ui/card";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AppLayout current_page="settings">
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card x-chunk="dashboard-04-chunk-1">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </Card>

                    <Card x-chunk="dashboard-04-chunk-1">
                        <UpdatePasswordForm className="max-w-xl" />
                    </Card>

                    <Card x-chunk="dashboard-04-chunk-1">
                        <DeleteUserForm className="max-w-xl" />
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
