import Application from '../models/Application.js';

export async function listApplications(req, res, next) {
  try {
    const { jobId, status } = req.query;
    const query = {};
    if (jobId) query.jobId = jobId;
    if (status) query.status = status;
    const applications = await Application.find(query).sort('-createdAt');
    res.json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
}

export async function getSingleApplication(req, res, next) {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) throw new Error('Application not found');
    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}

export async function createApplication(req, res, next) {
  try {
    const { jobId, jobTitle, department, jobType, location, name, email, phone, resumeUrl, coverLetter, experience, skills } = req.body;
    if (!jobId || !jobTitle || !department || !name || !email) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const existing = await Application.findOne({ jobId, email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'You have already applied for this job.' });
    }
    const application = await Application.create({
      jobId,
      jobTitle,
      department,
      jobType: jobType || '',
      location: location || '',
      name,
      email,
      phone: phone || '',
      resumeUrl: resumeUrl || '',
      coverLetter: coverLetter || '',
      experience: experience || '',
      skills: skills || ''
    });
    res.status(201).json({ success: true, data: application, message: 'Application submitted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function updateApplication(req, res, next) {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, strict: false }
    );
    if (!application) throw new Error('Application not found');
    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}

export async function deleteApplication(req, res, next) {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) throw new Error('Application not found');
    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}
