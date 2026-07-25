import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiArrowLeft,
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiCheckCircle,
  FiLock
} from 'react-icons/fi';
import { fetchPublishedBySlug } from '../services/contentApi.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import api from '../services/api.js';
import config from '../config/index.js';

function ApplicationSuccess({ job, form, onReset }) {
  return (
    <div className="rounded-[28px] border border-emerald-200 bg-white p-8 shadow-sm dark:border-emerald-900 dark:bg-slate-900">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
        <FiCheckCircle className="text-emerald-500 dark:text-emerald-400" size={32} />
      </div>
      <h3 className="mt-6 text-center text-2xl font-black text-primary dark:text-white">Application Submitted Successfully!</h3>
      <p className="mt-2 text-center text-sm text-slate-500">We will contact you within 48 hours regarding your application.</p>

      <div className="mt-8 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Position</span>
          <span className="font-bold text-primary dark:text-white">{job.title}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Department</span>
          <span className="font-bold text-primary dark:text-white">{job.department}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Type</span>
          <span className="font-bold text-primary dark:text-white">{job.jobType}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Location</span>
          <span className="font-bold text-primary dark:text-white">{job.location}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Applicant</span>
          <span className="font-bold text-primary dark:text-white">{form.name}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Email</span>
          <span className="font-bold text-primary dark:text-white">{form.email}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Resume</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Attached</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button to="/careers/open-positions" className="w-full">Browse More Jobs</Button>
        <Button to="/" variant="ghost" className="w-full">Back to Home</Button>
      </div>
    </div>
  );
}

export default ApplicationSuccess;
