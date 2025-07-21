'use server';

import {z} from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

const formScheme = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(), // coerce means that it changed datatype to number 
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const UpdateInvoice = formScheme.omit({ id: true, date: true });

const CreateInvoice = formScheme.omit({id: true, date: true});

export async function createInvoice(formData: FormData) {

    const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    const amountInCents = amount*100; 
    const date = new Date().toISOString().split('T')[0];
    // const rawFormData = {
    //     cutomerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status')
    // };

    // console.log(rawFormData);
    // console.log(typeof rawFormData.amount);

    // now adding an sql statement into the database
    await sql`INSERT into invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `

    revalidatePath('/dashboard/invoices'); // path is revalidated when the database is updated
    // new request made to the server

    // then user is redirected to the invoices page 
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}