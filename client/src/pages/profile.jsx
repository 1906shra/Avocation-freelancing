import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa'; // For upload icons
import { Camera } from 'lucide-react'; // or use another icon library
import img from '../assets/bg21.jpeg'; 
import SkillsInput from '../components/skill'; // Assuming you have a SkillsInput component


const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploading1, setUploading1] = useState(false);
   
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/me');
        setProfile(data);
        setAvatarPreview(data?.avatar?.url || '');
        setSkillsText(Array.isArray(data.skills) ? data.skills.join(', ') : '');
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

const handleAvatarChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('avatar', file);

  try {
    setUploading1(true); // start uploading

    const token = localStorage.getItem('token'); // Or your token source

    const { data } = await axios.post(
      'http://localhost:3000/api/auth/upload-avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProfile((prev) => ({ ...prev, avatar: data.avatar })); // update avatar here
    setAvatarPreview(data.avatar.url); // optionally update avatar preview
  } catch (err) {
    console.error('Avatar upload failed:', err);
  } finally {
    setUploading1(false); // stop uploading no matter what
  }
};


const handleCoverChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('coverImage', file);

  try {
    setUploading(true);  // start uploading

    const token = localStorage.getItem('token');  // Or your token source

    const { data } = await axios.post(
      'http://localhost:3000/api/auth/upload-cover-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProfile((prev) => ({ ...prev, coverImage: data.coverImage }));
  } catch (err) {
    console.error('Cover image upload failed:', err);
  } finally {
    setUploading(false);  // stop uploading no matter what
  }
};



  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const { data } = await axios.post('/api/auth/upload-resume', formData);
      setProfile((prev) => ({ ...prev, resume: data.resume }));
    } catch (err) {
      console.error('Resume upload failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedProfile = {
        ...profile,
        skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const { data } = await axios.put('/api/auth/profile', updatedProfile);
      setProfile(data.user);
      setSkillsText(data.user.skills?.join(', ') || '');
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setLoading(false);
    }
  };

   const handleSubmit1 = () => {
    const skills = selectedSkills.map(skill => skill.value);
    console.log('Submitted Skills:', skills);
    // Save to backend...
  };

  if (fetching) return <div className="p-8 text-center text-lg font-medium">Loading profile...</div>;

  return (
    <motion.div
      className="max-w-8xl mx-auto p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
<div className="w-full">
  {/* Header */}

  {/* Cover Image */}
  <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mb-8">
    {profile.coverImage?.url ? (
      <img
        src={profile.coverImage.url}
        alt="Cover"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg">
        <img src={img} alt="" />
      </div>
    )}

    {/* Optional: dark overlay */}
    {profile.coverImage?.url && (
      <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition duration-300" />
    )}

    {/* Avatar Image */}
    <div className="absolute bottom-2 left-6 w-20 h-20 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 translate-y-[-0px] md:translate-y-[-30px]">
      {profile.avatar?.url ? (
        <img
          src={profile.avatar.url}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {/* You can put a placeholder icon or initials here */}
          <span>👤</span>
        </div>
      )}
      {/* Camera Icon for Avatar Upload */}
      <label
    htmlFor="avatarUpload"
    className="absolute bottom-2 right-0 bg-white rounded-full p-1 cursor-pointer shadow-md hover:bg-gray-100 transition flex items-center"
  >
    <Camera className="text-blue-600 w-6 h-6" />
    {uploading1 && (
      <span className="ml-2 text-sm text-gray-500 font-medium">Uploading...</span>
    )}
  </label>

  <input
    type="file"
    id="avatarUpload"
    accept="image/*"
    onChange={handleAvatarChange}
    className="absolute -top-12 left-0 opacity-0 w-0 h-0"
  />
    </div>

    {/* Camera Icon for Cover Upload */}
   <label
  htmlFor="coverUpload"
  className="absolute top-4 right-4 bg-white rounded-full p-2 cursor-pointer shadow-md hover:bg-gray-100 transition"
>
  {uploading ? (
    <span className="text-gray-500 text-sm">Uploading...</span>
  ) : (
    <Camera className="text-blue-600 w-5 h-5" />
  )}
</label>

<input
  type="file"
  id="coverUpload"
  accept="image/*"
  onChange={handleCoverChange}
  className="hidden"
/>

  </div>
</div>



<div className="flex flex-col md:flex-row gap-10 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Left: Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 space-y-6"
        aria-label="Edit user profile form"
      >
        {/* Full Name */}
        <div className="max-w-md">
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={profile.fullName ?? ''}
            onChange={handleChange}
            disabled={!editMode}
            className="input input-bordered w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 transition duration-150 px-4 py-2 text-sm"
            placeholder="Enter your full name"
          />
        </div>

        {/* Bio */}
        <div className="max-w-md">
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio ?? ''}
            onChange={handleChange}
            disabled={!editMode}
            className="textarea textarea-bordered w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 transition duration-150 px-4 py-2 text-sm resize-none"
            rows={3}
            placeholder="Write a short bio"
          />
        </div>

        {/* Skills */}
       <div >
      <SkillsInput
        editMode={editMode}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />
      
      
    </div>

        {/* Website & GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div>
            <label htmlFor="website" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={profile.website ?? ''}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 transition duration-150 px-4 py-2 text-sm"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div>
            <label htmlFor="github" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              GitHub
            </label>
            <input
              id="github"
              name="github"
              type="url"
              value={profile.github ?? ''}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 transition duration-150 px-4 py-2 text-sm"
              placeholder="https://github.com/username"
            />
          </div>
        </div>

        {/* LinkedIn & Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div>
            <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              LinkedIn
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={profile.linkedin ?? ''}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 transition duration-150 px-4 py-2 text-sm"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={profile.availability ?? 'available'}
              onChange={handleChange}
              disabled={!editMode}
              className="select select-bordered w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 transition duration-150 px-4 py-2 text-sm"
            >
              <option value="available">Available</option>
              <option value="not available">Not Available</option>
              <option value="busy">Busy</option>
            </select>
          </div>
        </div>

        {/* Conditional Uploads */}
        {editMode && (
          <fieldset className="space-y-6 mt-6 max-w-4xl" aria-label="Upload section">


            <div>
              <label htmlFor="resume-upload" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Resume
              </label>
              <label htmlFor="resume-upload" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium cursor-pointer transition">
                <FaUpload />
                <span>Upload Resume (PDF, DOC, DOCX)</span>
              </label>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="sr-only"
              />
            </div>
          </fieldset>
        )}

        {/* Resume Link */}
        {profile.resume?.url && (
          <a
            href={profile.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-semibold mt-2 underline block"
          >
            View Resume
          </a>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          {editMode ? (
            <>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-6 py-2 transition"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-6 py-2 font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 rounded-md px-6 py-2 font-semibold"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>

      {/* Right: Bulletin Board */}
      <aside className="w-full md:w-1/3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md space-y-4 h-fit sticky top-24">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">🗒️ Bulletin Board</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-2">
          <li>Complete your profile to get more job matches.</li>
          <li>Upload your latest resume and cover image.</li>
          <li>Be honest in your skills and availability.</li>
          <li>Check messages from potential clients.</li>
          <li>Update your social links for better visibility.</li>
        </ul>
      </aside>
    </div>


      {/* Reviews Section */}
    <div className="mt-12 p-6 bg-gray-50 rounded-lg shadow-inner">
  <h2 className="text-2xl font-bold mb-4 text-indigo-700">
    Reviews ({profile.reviews?.length ?? 0})
  </h2>

  {profile.reviews?.length > 0 ? (
    <div className="space-y-5">
      {profile.reviews.map((rev, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-1">
            <div className="font-semibold text-lg text-gray-800">{rev.reviewerName}</div>
            <div className="text-yellow-500 font-bold text-md">
              {'⭐'.repeat(rev.rating)}{' '}
              <span className="text-gray-400 text-sm">({rev.rating})</span>
            </div>
          </div>
          <p className="text-gray-700">{rev.comment}</p>
          <div className="text-xs text-gray-400 mt-2">
            {new Date(rev.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  ) : (
   <div className="flex items-center gap-2 text-gray-500 text-sm italic border border-dashed border-gray-300 p-3 rounded-lg shadow-sm bg-gray-50">
  <span className="text-xl">📝</span>
  <span>
    No reviews yet. <span className="text-blue-500 underline cursor-pointer hover:text-blue-600">Write the first one!</span>
  </span>
</div>

  )}
</div>

    </motion.div>
  );
};

export default MyProfile;
