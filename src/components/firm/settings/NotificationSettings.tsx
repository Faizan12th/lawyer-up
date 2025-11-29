import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Bell } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function NotificationSettings() {
    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(false);
    const [apptReminders, setApptReminders] = useState(true);
    const [paymentUpdates, setPaymentUpdates] = useState(true);
    const [chatMessages, setChatMessages] = useState(true);
    const [lawyerActivity, setLawyerActivity] = useState(true);

    return (
        <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-gray-900" />
                </div>
                <div>
                    <h3 className="font-semibold">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Channels</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                                <p className="text-xs text-muted-foreground">Receive updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                                <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Types</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Appointment Reminders</p>
                                <p className="text-xs text-muted-foreground">Upcoming appointment alerts</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={apptReminders} onChange={() => setApptReminders(!apptReminders)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Payment Updates</p>
                                <p className="text-xs text-muted-foreground">Payment confirmations and reminders</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={paymentUpdates} onChange={() => setPaymentUpdates(!paymentUpdates)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Chat Messages</p>
                                <p className="text-xs text-muted-foreground">New messages from lawyers</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={chatMessages} onChange={() => setChatMessages(!chatMessages)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Lawyer Activity Reports</p>
                                <p className="text-xs text-muted-foreground">Weekly summaries of lawyer performance</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={lawyerActivity} onChange={() => setLawyerActivity(!lawyerActivity)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                        Save Preferences
                    </Button>
                </div>
            </div>
        </Card>
    );
}
