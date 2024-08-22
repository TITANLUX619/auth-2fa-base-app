import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/schemas'

const formSchema = authFormSchema('sign-up')

interface AuthInput {
  id: string,
  control: Control<z.infer<typeof formSchema>>,
  type: string,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder?: string
  disabled?: boolean
}

const AuthInput = ({ id, control, type, name, label, placeholder, disabled = false }: AuthInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                id={id}
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  )
}

export default AuthInput