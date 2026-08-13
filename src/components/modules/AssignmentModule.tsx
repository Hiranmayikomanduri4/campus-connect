import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Paperclip, 
  Github, 
  FileText, 
  Award, 
  CheckCircle, 
  Clock, 
  X, 
  Send,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Assignment, Submission } from '../../types';

export const AssignmentModule: React.FC = () => {
  const { currentUser } = useAuth();
  const { assignments, submissions, createAssignment, submitAssignmentSolution, gradeSubmission } = useData();

  const isFacultyOrAdmin = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  // Create Assignment Form State
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('Artificial Intelligence & Machine Learning');
  const [deadline, setDeadline] = useState('2026-08-28');
  const [maxMarks, setMaxMarks] = useState(100);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [rubric, setRubric] = useState('');

  // Submit Solution State for Students
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [solutionText, setSolutionText] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  // Grade State for Faculty
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeMarks, setGradeMarks] = useState<number>(90);
  const [gradeFeedback, setGradeFeedback] = useState('');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    createAssignment({
      title,
      description,
      subject,
      courseCode: 'CS602',
      department: currentUser?.department || 'CSE',
      deadline,
      maxMarks,
      facultyId: currentUser?.uid || 'fac-1',
      facultyName: currentUser?.name || 'Dr. Faculty',
      attachmentUrl,
      rubric
    });
    setIsCreating(false);
    setTitle('');
    setDescription('');
  };

  const handleSubmitSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !currentUser) return;

    submitAssignmentSolution({
      assignmentId: selectedAssignment.id,
      studentId: currentUser.uid,
      studentName: currentUser.name,
      studentRoll: currentUser.rollNumber || 'CS2022042',
      solutionText,
      githubUrl,
      fileUrl
    });

    setSelectedAssignment(null);
    setSolutionText('');
    setGithubUrl('');
    setFileUrl('');
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    gradeSubmission(selectedSubmission.id, gradeMarks, gradeFeedback);
    setSelectedSubmission(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Assignments & Coursework</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isFacultyOrAdmin
              ? 'Publish course assignments, define rubrics, and grade student submissions'
              : 'View deadlines, submit solution GitHub repos, and track your grades'}
          </p>
        </div>

        {isFacultyOrAdmin && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Assignment</span>
          </button>
        )}
      </div>

      {/* Create Assignment Form Modal */}
      {isCreating && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-indigo-500 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Publish New Assignment</h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateAssignment} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Neural Network Architecture Design"
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description & Requirements</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe problem statement and submission guidelines..."
                required
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deadline Date</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Max Marks</label>
                <input
                  type="number"
                  value={maxMarks}
                  onChange={e => setMaxMarks(Number(e.target.value))}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Attachment Link (Optional)</label>
                <input
                  type="url"
                  value={attachmentUrl}
                  onChange={e => setAttachmentUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Rubric Criteria</label>
              <input
                type="text"
                value={rubric}
                onChange={e => setRubric(e.target.value)}
                placeholder="e.g. Accuracy (40%), Code Quality (30%), Report (30%)"
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md transition"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Student Submit Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Submit Solution</h3>
                <p className="text-xs text-slate-500">{selectedAssignment.title}</p>
              </div>
              <button onClick={() => setSelectedAssignment(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitSolution} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub Repository Link</label>
                <div className="relative">
                  <Github className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={e => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">PDF / ZIP Document File Link</label>
                <div className="relative">
                  <Paperclip className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={fileUrl}
                    onChange={e => setFileUrl(e.target.value)}
                    placeholder="https://campusconnect.edu/docs/submission.pdf"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Solution Notes / Description</label>
                <textarea
                  value={solutionText}
                  onChange={e => setSolutionText(e.target.value)}
                  rows={3}
                  placeholder="Summary of methodology, framework used, evaluation metrics..."
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Work</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Grade Student Submission</h3>
                <p className="text-xs text-slate-500">{selectedSubmission.studentName} ({selectedSubmission.studentRoll})</p>
              </div>
              <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Marks Assigned</label>
                <input
                  type="number"
                  value={gradeMarks}
                  onChange={e => setGradeMarks(Number(e.target.value))}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Faculty Feedback</label>
                <textarea
                  value={gradeFeedback}
                  onChange={e => setGradeFeedback(e.target.value)}
                  rows={3}
                  placeholder="Provide constructive feedback on implementation..."
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md transition"
                >
                  Save Grade & Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map(asg => {
          const mySub = submissions.find(s => s.assignmentId === asg.id && s.studentId === currentUser?.uid);
          const asgSubmissions = submissions.filter(s => s.assignmentId === asg.id);

          return (
            <div
              key={asg.id}
              className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold rounded-md">
                    {asg.subject}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{asg.title}</h3>
                  <p className="text-xs text-slate-500">By {asg.facultyName} • Due Date: <span className="font-bold text-rose-600">{asg.deadline}</span></p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl">
                    Max Marks: {asg.maxMarks}
                  </span>

                  {!isFacultyOrAdmin && (
                    mySub ? (
                      <span className={`px-3 py-1 text-xs font-bold rounded-xl ${
                        mySub.status === 'reviewed' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {mySub.status === 'reviewed' ? `Graded: ${mySub.marks}/${asg.maxMarks}` : 'Submitted'}
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedAssignment(asg)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                      >
                        Submit Solution
                      </button>
                    )
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{asg.description}</p>

              {asg.rubric && (
                <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-2xl text-xs text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-600">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Rubric Criteria: </span>
                  {asg.rubric}
                </div>
              )}

              {/* Submissions Section for Faculty */}
              {isFacultyOrAdmin && (
                <div className="pt-2 space-y-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Student Submissions ({asgSubmissions.length})
                  </p>
                  <div className="space-y-2">
                    {asgSubmissions.map(sub => (
                      <div
                        key={sub.id}
                        className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-between text-xs border border-slate-200/60 dark:border-slate-600"
                      >
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{sub.studentName} ({sub.studentRoll})</p>
                          <p className="text-[10px] text-slate-500">Submitted: {sub.submittedAt}</p>
                          {sub.githubUrl && (
                            <a href={sub.githubUrl} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-600 hover:underline flex items-center space-x-1 mt-0.5">
                              <Github className="w-3 h-3" />
                              <span>View Repo</span>
                            </a>
                          )}
                        </div>

                        <div>
                          {sub.status === 'reviewed' ? (
                            <div className="text-right">
                              <span className="text-xs font-bold text-emerald-600">{sub.marks} / {asg.maxMarks}</span>
                              <p className="text-[10px] text-slate-400">Feedback: "{sub.feedback}"</p>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              className="px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-xl text-[11px] hover:bg-indigo-700 transition"
                            >
                              Grade Submission
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
