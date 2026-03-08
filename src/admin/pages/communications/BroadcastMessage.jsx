// src/admin/pages/communications/BroadcastMessage.jsx
import React, { useState } from 'react';
import { Send, Users, Mail, MessageSquare, Filter } from 'lucide-react';

const BroadcastMessage = () => {
  const [messageType, setMessageType] = useState('email');
  const [recipients, setRecipients] = useState('all');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [preview, setPreview] = useState(false);
  const [sending, setSending] = useState(false);

  const recipientOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'active', label: 'Active Members' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'lapsed', label: 'Lapsed Members' },
    { value: 'custom', label: 'Custom Filter' }
  ];

  const handleSend = async () => {
    setSending(true);
    try {
      await adminApi.sendBroadcast({
        type: messageType,
        recipients,
        subject,
        content,
        scheduledDate: scheduledDate || null
      });
      // Show success message
    } catch (error) {
      console.error('Failed to send broadcast:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Send Broadcast Message</h1>

      {/* Message Type Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMessageType('email')}
            className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
              messageType === 'email'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Mail className={messageType === 'email' ? 'text-blue-600' : 'text-gray-600'} size={24} />
            <span className={`ml-2 font-medium ${
              messageType === 'email' ? 'text-blue-600' : 'text-gray-600'
            }`}>Email</span>
          </button>
          
          <button
            onClick={() => setMessageType('whatsapp')}
            className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
              messageType === 'whatsapp'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <MessageSquare className={messageType === 'whatsapp' ? 'text-green-600' : 'text-gray-600'} size={24} />
            <span className={`ml-2 font-medium ${
              messageType === 'whatsapp' ? 'text-green-600' : 'text-gray-600'
            }`}>WhatsApp</span>
          </button>
        </div>

        {/* Recipients Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Send To
          </label>
          <select
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            {recipientOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Filters (shown when 'custom' is selected) */}
        {recipients === 'custom' && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3 flex items-center">
              <Filter size={16} className="mr-2" />
              Custom Filters
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Plan</label>
                <select className="w-full border rounded px-2 py-1">
                  <option>Any</option>
                  <option>Basic</option>
                  <option>Plus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Status</label>
                <select className="w-full border rounded px-2 py-1">
                  <option>Any</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Joined After</label>
                <input type="date" className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Location</label>
                <input type="text" className="w-full border rounded px-2 py-1" placeholder="Postal code" />
              </div>
            </div>
          </div>
        )}

        {/* Message Content */}
        {messageType === 'email' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              placeholder="Enter email subject"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          {messageType === 'email' ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full border rounded-lg px-3 py-2 font-mono"
              placeholder="Write your email content here... (HTML supported)"
            />
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your WhatsApp message..."
              maxLength={1000}
            />
          )}
          <div className="text-right text-sm text-gray-500 mt-1">
            {content.length}/1000 characters
          </div>
        </div>

        {/* Scheduling */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schedule (Optional)
          </label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        {/* Preview Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setPreview(!preview)}
            className="text-blue-600 hover:text-blue-800"
          >
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {/* Preview */}
        {preview && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3">Preview</h3>
            {messageType === 'email' ? (
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>To:</strong> 123 recipients
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Subject:</strong> {subject || 'No subject'}
                </p>
                <div className="bg-white border rounded p-4">
                  {content || 'Your message will appear here'}
                </div>
              </div>
            ) : (
              <div className="bg-white border rounded p-4 max-w-sm mx-auto">
                <p className="text-sm">{content || 'Your WhatsApp message will appear here'}</p>
                <p className="text-xs text-gray-500 mt-2">Delivered via WhatsApp</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSend}
            disabled={!content || sending}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>Sending...</>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Send Message
              </>
            )}
          </button>
          <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Save as Draft
          </button>
        </div>
      </div>

      {/* Recent Broadcasts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Broadcasts</h2>
        <div className="space-y-4">
          {/* Map through recent broadcasts */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Membership Renewal Reminder</p>
              <p className="text-sm text-gray-600">Sent to 234 members • 2 hours ago</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-green-600">98% delivered</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">View Stats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastMessage;