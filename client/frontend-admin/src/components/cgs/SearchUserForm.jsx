// import { useState, useMemo } from 'react';
// // import { Search, Loader2 } from 'lucide-react'; // Removing Search icon import
// import { UserPlus, Loader2 } from 'lucide-react'; // Adding UserPlus icon for Register
// import { Button } from '../ui/button';
// import { Label } from '../ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';
// import { Input } from '../ui/input';
// // Ensure this path is correct for your DEPARTMENTS mock data
// import { DEPARTMENTS } from '../../data/mockUsers'; 

// const NO_SELECTION = 'placeholder'; 

// export default function SearchUserForm({ onSearch, isSearching }) {
//   const [role, setRole] = useState('');
//   const [idValue, setIdValue] = useState('');
//   const [departmentCode, setDepartmentCode] = useState('');
//   // New State: Use placeholder to enforce selection when role is Examiner
//   const [examinerType, setExaminerType] = useState(NO_SELECTION); 

//   // --- Conditional Logic ---
//   const isExaminer = role === 'Examiner';
//   const hasExaminerTypeSelected = examinerType !== NO_SELECTION;
//   const isInternalExaminer = isExaminer && examinerType === 'internal';
//   const isExternalExaminer = isExaminer && examinerType === 'external';

//   // ID/Email field logic
//   const isEmailSearch = isExaminer; // Examiner role always searches by email now
  
//   // Controls disabling of ID/Email and Department fields
//   const isSearchFieldsEnabled = !isExaminer || hasExaminerTypeSelected;

//   // --- Handlers ---

//   const handleRoleChange = (newRole) => {
//     setRole(newRole);
//     setIdValue(''); // Clear ID/Email
//     setDepartmentCode(''); // Clear Dept Code
    
//     // If changing to Examiner, reset the type selection
//     if (newRole === 'Examiner') {
//         setExaminerType(NO_SELECTION);
//     } else {
//         setExaminerType(NO_SELECTION); // Keep it reset for non-examiner roles
//     }
//   };
  
//   const handleExaminerTypeChange = (newType) => {
//     setExaminerType(newType);
//     setIdValue(''); // Clear Email/ID on type change
//     setDepartmentCode(''); // Clear Dept Code on type change

//     if (newType === 'internal') {
//         // Internal examiners are locked to 'OTHERS'
//         setDepartmentCode('OTHERS');
//     }
//     // If External, departmentCode should remain empty/undefined
//   };

//   const getIdPlaceholder = useMemo(() => {
//     if (!role) return 'Select a role first';
//     if (isEmailSearch) return 'Enter Email Address (e.g., jane.doe@university.com)';
//     if (role === 'Student') return 'Enter Student ID (e.g., STU001)';
//     return 'Enter Employee ID (e.g., EMP001)'; // Supervisor/CGS Staff
//   }, [role, isEmailSearch]);

//   const getAvailableDepartments = useMemo(() => {
//     // Internal Examiner can ONLY be registered under 'OTHERS'
//     if (isInternalExaminer) {
//         return DEPARTMENTS.filter(d => d.code === 'OTHERS');
//     }
//     // All other roles use the full list
//     return DEPARTMENTS;
//   }, [isInternalExaminer]);


//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Enforce selection of Examiner Type if Examiner role is chosen
//     if (isExaminer && !hasExaminerTypeSelected) {
//         alert("Please select the Examiner Type (Internal or External) first.");
//         return;
//     }

//     if (role) {
//       // Pass examinerType to the parent handleSearch function
//       // ⭐ MODIFIED: onSearch is now used for both Search and Register actions 
//       // (the parent component needs to handle the logic change based on 'isExaminer')
//       onSearch(role, idValue.trim(), departmentCode, isExaminer ? examinerType : undefined);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className={`grid gap-4 md:grid-cols-${isExaminer ? 4 : 3}`}>
//         {/* 1. Role Selection (Always visible) */}
//         <div className="space-y-2">
//           <Label htmlFor="role">Select Role</Label>
//           <Select value={role} onValueChange={handleRoleChange}>
//             <SelectTrigger id="role" className="bg-background">
//               <SelectValue placeholder="Select role..." />
//             </SelectTrigger>
//             <SelectContent className="bg-popover">
//               <SelectItem value="Student">Student</SelectItem>
//               <SelectItem value="Supervisor">Supervisor</SelectItem>
//               <SelectItem value="Examiner">Examiner</SelectItem>
//               <SelectItem value="CGS Staff">CGS Staff</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* 2. Examiner Type Selection (NEW: Conditional) */}
//         {isExaminer && (
//           <div className="space-y-2">
//             <Label htmlFor="examinerType">Examiner Type</Label>
//             <Select 
//               value={examinerType} 
//               onValueChange={handleExaminerTypeChange}
//             >
//               <SelectTrigger id="examinerType" className="bg-background">
//                 <SelectValue placeholder="Select type..." />
//               </SelectTrigger>
//               <SelectContent className="bg-popover">
//                 {/* Use the NO_SELECTION sentinel to force a pick */}
//                 {examinerType === NO_SELECTION && <SelectItem value={NO_SELECTION} disabled>Select type...</SelectItem>}
//                 <SelectItem value="internal">Internal</SelectItem>
//                 <SelectItem value="external">External</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         )}
        
//         {/* 3. ID / Email Input */}
//         <div className="space-y-2">
//           <Label htmlFor="idValue">{isEmailSearch ? 'Email' : 'ID'}</Label>
//           <Input
//             id="idValue"
//             type={isEmailSearch ? 'email' : 'text'} // Changes input type based on role
//             value={idValue}
//             onChange={(e) => setIdValue(e.target.value)}
//             placeholder={getIdPlaceholder}
//             // DISABLED if no role is selected, OR if Examiner is selected but type is NOT
//             disabled={!role || (isExaminer && !hasExaminerTypeSelected)} 
//             required={role === 'Examiner'} // Email is mandatory for Examiners
//             className="bg-background"
//           />
//         </div>

//         {/* 4. Department Code (Conditional on External Examiner) */}
//         {!isExternalExaminer && (
//             <div className="space-y-2">
//                 <Label htmlFor="departmentCode">Department Code</Label>
//                 <Select 
//                     value={departmentCode} 
//                     onValueChange={setDepartmentCode}
//                     // DISABLED if not enabled, or if Internal Examiner (auto-selected)
//                     disabled={!isSearchFieldsEnabled || isInternalExaminer}
//                 >
//                     <SelectTrigger id="departmentCode" className="bg-background">
//                         <SelectValue placeholder="Select department..." />
//                     </SelectTrigger>
//                     <SelectContent className="bg-popover">
//                         {getAvailableDepartments.map((dept) => (
//                             <SelectItem key={dept.code} value={dept.code}>
//                                 {dept.code}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>
//                 {/* REMOVED: The <p> tag that said 'Locked to 'OTHERS'' */}
//             </div>
//         )}
//       </div>

//       <Button
//         type="submit"
//         // Disable if searching, OR if no role selected, OR if Examiner chosen but type not set, OR if Email/ID is empty when required
//         disabled={isSearching || !role || (isExaminer && !hasExaminerTypeSelected) || (isExaminer && !idValue)}
//         className="w-full md:w-auto"
//       >
//         {isSearching 
//           ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               {isExaminer ? 'Registering...' : 'Searching...'}
//             </>
//           ) 
//           : (
//             <>
//               {isExaminer ? <UserPlus className="mr-2 h-4 w-4" /> : <Search className="mr-2 h-4 w-4" />}
//               {isExaminer ? 'Register' : 'Search'}
//             </>
//           )
//         }
//       </Button>
//     </form>
//   );
// }

import { useState, useMemo } from 'react';
import { Search, Loader2, UserPlus } from 'lucide-react'; 
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

// ⭐ REMOVED: import { DEPARTMENTS } from '../../data/mockUsers';

const NO_SELECTION = 'placeholder'; 

// ⭐ NEW: Hardcoded Department List (minimal set for front-end demonstration)
const HARDCODED_DEPARTMENTS = [
  { code: 'CS', name: 'Computer Science' },
  { code: 'MATH', name: 'Mathematics' },
  { code: 'OTHERS', name: 'Others' },
];

export default function SearchUserForm({ onSearch, isSearching }) {
  const [role, setRole] = useState('');
  const [idValue, setIdValue] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [examinerType, setExaminerType] = useState(NO_SELECTION); 

  // --- Conditional Logic ---
  const isExaminer = role === 'Examiner';
  const hasExaminerTypeSelected = examinerType !== NO_SELECTION;
  const isInternalExaminer = isExaminer && examinerType === 'internal';
  const isExternalExaminer = isExaminer && examinerType === 'external';
  const isEmailSearch = isExaminer;
  const isSearchFieldsEnabled = !isExaminer || hasExaminerTypeSelected;

  // --- Handlers ---

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setIdValue('');
    setDepartmentCode('');
    
    if (newRole === 'Examiner') {
        setExaminerType(NO_SELECTION);
    } else {
        setExaminerType(''); // Reset to empty string for non-examiner roles
    }
  };
  
  const handleExaminerTypeChange = (newType) => {
    setExaminerType(newType);
    setIdValue('');
    setDepartmentCode('');

    if (newType === 'internal') {
        // Internal examiners are locked to 'OTHERS'
        setDepartmentCode('OTHERS');
    }
  };

  const getIdPlaceholder = useMemo(() => {
    if (!role) return 'Select a role first';
    if (isEmailSearch) return 'Enter Email Address (e.g., jane.doe@university.com)';
    if (role === 'Student') return 'Enter Student ID (e.g., STU001)';
    return 'Enter Employee ID (e.g., EMP001)';
  }, [role, isEmailSearch]);

  // ⭐ REMOVED: getAvailableDepartments useMemo hook

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isExaminer && !hasExaminerTypeSelected) {
        alert("Please select the Examiner Type (Internal or External) first.");
        return;
    }

    if (role) {
      onSearch(role, idValue.trim(), departmentCode, isExaminer ? examinerType : undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid gap-4 md:grid-cols-${isExaminer ? 4 : 3}`}>
        {/* 1. Role Selection */}
        <div className="space-y-2">
          <Label htmlFor="role">Select Role</Label>
          <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger id="role" className="bg-background">
              <SelectValue placeholder="Select role..." />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Examiner">Examiner</SelectItem>
              <SelectItem value="CGS Staff">CGS Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 2. Examiner Type Selection */}
        {isExaminer && (
          <div className="space-y-2">
            <Label htmlFor="examinerType">Examiner Type</Label>
            <Select 
              value={examinerType} 
              onValueChange={handleExaminerTypeChange}
            >
              <SelectTrigger id="examinerType" className="bg-background">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {examinerType === NO_SELECTION && <SelectItem value={NO_SELECTION} disabled>Select type...</SelectItem>}
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="external">External</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* 3. ID / Email Input */}
        <div className="space-y-2">
          <Label htmlFor="idValue">{isEmailSearch ? 'Email' : 'ID'}</Label>
          <Input
            id="idValue"
            type={isEmailSearch ? 'email' : 'text'}
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
            placeholder={getIdPlaceholder}
            disabled={!role || (isExaminer && !hasExaminerTypeSelected)} 
            required={role === 'Examiner'}
            className="bg-background"
          />
        </div>

        {/* 4. Department Code (Conditional on External Examiner) */}
        {!isExternalExaminer && (
            <div className="space-y-2">
                <Label htmlFor="departmentCode">Department Code</Label>
                <Select 
                    value={departmentCode} 
                    onValueChange={setDepartmentCode}
                    // Department is disabled if Examiner Type is Internal (auto-set to OTHERS) or no fields enabled
                    disabled={!isSearchFieldsEnabled || isInternalExaminer}
                >
                    <SelectTrigger id="departmentCode" className="bg-background">
                        <SelectValue placeholder="Select department..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                        {/* ⭐ FIX: Using the hardcoded list */}
                        {HARDCODED_DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept.code} value={dept.code}>
                                {dept.code}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSearching || !role || (isExaminer && !hasExaminerTypeSelected) || (isExaminer && !idValue)}
        className="w-full md:w-auto"
      >
        {isSearching 
          ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isExaminer ? 'Registering...' : 'Searching...'}
            </>
          ) 
          : (
            <>
              {isExaminer ? <UserPlus className="mr-2 h-4 w-4" /> : <Search className="mr-2 h-4 w-4" />}
              {isExaminer ? 'Register' : 'Search'}
            </>
          )
        }
      </Button>
    </form>
  );
}