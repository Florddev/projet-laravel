import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
        clearErrors();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>

                <CardDescription>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </CardDescription>
            </CardHeader>

            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button onClick={confirmUserDeletion} variant="destructive">Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent show={confirmingUserDeletion} onClose={closeModal}>
                        <form onSubmit={deleteUser} className="p-6">
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure you want to delete your account?
                                </DialogTitle>

                                <DialogDescription>
                                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                                    enter your password to confirm you would like to permanently delete your account.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-6">
                                <Label htmlFor="password">Password</Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="Password"
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <DialogClose asChild>
                                    <Button onClick={closeModal} variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button className="ms-3" disabled={processing} variant="destructive">
                                    Delete Account
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </section>
    );
}
