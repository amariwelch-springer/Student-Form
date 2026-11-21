import { useState } from 'react'

interface Entry {
  name: string
  email: string
  course: string
}

const App = () => {
  const [formData, setFormData] = useState<Entry>({
    name: "",
    email: "",
    course: "react"
  })
  const [errors, setErrors] = useState<Partial<Entry>>({})
  const [entries, setEntries] = useState<Entry[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validate = () => {
    const newErrors: Partial<Entry> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required."
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email."
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setEntries(prevEntries => [...prevEntries, formData])
    setFormData({ name: "", email: "", course: "react" })
    setErrors({})
  }

  const handleDelete = (indexToDelete: number) => {
    setEntries(prevEntries => prevEntries.filter((_, index) => index !== indexToDelete))
  }

  const inputStyle = "w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Student Registration</h2>
        
        <div>
          <input 
            className={inputStyle} 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Student Name" 
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input 
            className={inputStyle} 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email Address" 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <select className={inputStyle} name="course" value={formData.course} onChange={handleChange}>
          <option value="react">React</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
        </select>

        <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors" type="submit">
          Submit
        </button>
      </form>

      {/* Submitted Entries */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-4 mt-8">
        {entries.map((entry, index) => (
          <div key={index} className="relative w-60 bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => handleDelete(index)}
              aria-label="Delete entry"
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
            >
              X
            </button>

            <p className="font-semibold text-gray-800 pr-6">{entry.name}</p>
            <p className="text-sm text-gray-600">{entry.email}</p>
            <span className="inline-block mt-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
              {entry.course}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App