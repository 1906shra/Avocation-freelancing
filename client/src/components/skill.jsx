// SkillsInput.jsx
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const skillOptions = [
  // Frontend
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'React', label: 'React' },
  { value: 'Next.js', label: 'Next.js' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Tailwind CSS', label: 'Tailwind CSS' },
  { value: 'Bootstrap', label: 'Bootstrap' },

  // Backend
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Express', label: 'Express' },
  { value: 'Django', label: 'Django' },
  { value: 'Flask', label: 'Flask' },
  { value: 'Spring Boot', label: 'Spring Boot' },
  { value: 'Laravel', label: 'Laravel' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },

  // Mobile
  { value: 'React Native', label: 'React Native' },
  { value: 'Flutter', label: 'Flutter' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Swift', label: 'Swift' },

  // Databases
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'SQLite', label: 'SQLite' },
  { value: 'Firebase', label: 'Firebase' },
  { value: 'Redis', label: 'Redis' },

  // DevOps & Tools
  { value: 'Docker', label: 'Docker' },
  { value: 'Kubernetes', label: 'Kubernetes' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Azure' },
  { value: 'Google Cloud', label: 'Google Cloud' },
  { value: 'Git', label: 'Git' },
  { value: 'GitHub', label: 'GitHub' },
  { value: 'CI/CD', label: 'CI/CD' },
  { value: 'Nginx', label: 'Nginx' },

  // Testing & QA
  { value: 'Jest', label: 'Jest' },
  { value: 'Mocha', label: 'Mocha' },
  { value: 'Cypress', label: 'Cypress' },
  { value: 'Selenium', label: 'Selenium' },
  { value: 'Playwright', label: 'Playwright' },

  // Other
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'REST API', label: 'REST API' },
  { value: 'JSON', label: 'JSON' },
  { value: 'WebSockets', label: 'WebSockets' },
  { value: 'OAuth', label: 'OAuth' },
  { value: 'Redux', label: 'Redux' },
  { value: 'Zustand', label: 'Zustand' },
  { value: 'Framer Motion', label: 'Framer Motion' },
  { value: 'Jira', label: 'Jira' },
  { value: 'Figma', label: 'Figma' }
];


const SkillsInput = ({ editMode, selectedSkills, setSelectedSkills }) => {
  return (
    <div className="max-w-md">
      <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Skills
      </label>

      <CreatableSelect
        inputId="skills"
        isMulti
        isDisabled={!editMode}
        value={selectedSkills}
        onChange={setSelectedSkills}
        options={skillOptions}
        placeholder="Select or type to add skills"
        className="react-select-container text-sm"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: editMode ? '#fff' : '#f1f5f9',
            borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
            '&:hover': {
              borderColor: '#6366f1',
            },
          }),
          menu: (base) => ({
            ...base,
            zIndex: 999,
          }),
        }}
      />

      <small className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
        Select from the list or add your own skills.
      </small>
    </div>
  );
};

export default SkillsInput;
