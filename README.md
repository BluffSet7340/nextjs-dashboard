## Next.js App Router Course - Starter

I am following the tutorial from Next.js foundational course to build a fullstack application: a financial dashboard.

### Chapter 1 - 5

This covered the initial introduction and the directory structure of the average next.js project. I learnt about adding custom css modules and/or using tailwind css to style elements. Within that I learnt about clsx, which styles elements based on certain conditions - green if customer paid, grey is payment is pending. Most importantly I learnt about how routing between pages occurs. This requires the layout.tsx and page.tsx. The former is needed to share UI components across pages - an example is sharing the side nav bar. The latter is needed to make the route accessible and only the components included in the page.tsx file are made accessible to the user.

### Chapter 6 - Postgres Database

So I was told to connect a database to this next.js project. Out of the given options, I used the Supabase database and connected to it via the Vercel Marketplace. After updating some files I noticed that no matter what I could not seed the database successfully. Although I could see the tables on the sql query editor on Supabase, for some reason I kept getting this error, which was to do with preparing SQL statements. It has something to do with Supabase's transaction pooler not supporting prepared statements. I was able to fix this issue by adding a prepare flag and setting it to false in the seed script a well as the query script

### Chapter 7 - Fetching Data

This chapter was relatively simple. It was uncommenting code containing sql statements and then import the necessary variables and accessing the data inside of those variables so that they could be displayed on the dashboard. One neat thing I Learnt about was the destructuring of an object, getting all the variables in one line, without the need of a dot operator.

I also learnt about waterfall, where having network request being served one at a time can slow things down and be time consuming. One method to deal with this is to use the Promise.all so that the requests are all sent at the same time. 

### Chapter 8 - Static and Dynamic Rendering

Static rendering is content that does not really change and so the results can be cached on the server and can be delivered to the client on a request, rather than creating a new dynamic request for each user. This could be a blog post for example. However, for dashboards, it is sometimes better to have dynamic data, where data changes in real time. In static rendering, data fetching and rendering happens on the server. It's useful for UI with no data or data that is shared between users. 

In dyanmic rendering, content is rendered on the server for each user at request time. This allows for real time, personalized data, to be shown for each user. 

With dynamic rendering, your application is only as fast as your slowest data fetch.

### Chapter 9 - Streaming

To fix the issue with slow data fetch requests, we use these loading skeleton of certain components that indicate to the user that the data is loading. We can apply this skeleton to the whole page or to certain components of the page, such as invoices, card data, and revenue chart. 

I learnt about the react suspense wrapper, which is used to replace a certain component with its skeleton component as a fallback while the data fetching happens. You can either stream the entire page, which leads to longer loading times or stream components, or certain chunks of a page, and then replace them with the desired data once the data fetch is complete. 

### Chapter 10 - Partial Prerendering

This is still under development and it works by combining both static and dynamic rendering. yippeeeee!!!

Modifying the config files a little and next.js figures out to load the static content beforehand and then load the dynamic content as the user requests them. All it requires is for you to wrap the dynamic parts of your route with the Suspense tag and adding the desired fallback skeleton

### Chapter 11 - Adding Search and Pagination

In this chapter I add search and pagination to the invoices page!!! The search is done via the url search params. This has the benefit of being bookmarkable, server side rendering, and for tracking user behavior.

The search functionality is implemented via three client hooks - useSearchParams, usePathname, and useRouter. 

Four steps are required: capture the user's input, update url with search params, keep the url in sync with input field, and update table to reflect user search query

Using the three client hooks above, you can update the URL without refreshing the page due to next.js client side navigation. Keeping the URL and input in sync requires you to set a defaultValue in the input field.

The search feature is pretty cool, not only can I search by name but also by email, and by category of paid or pending. I just checked and realized its due to the flexible SQL statement that allows for this.

When searching for an invoice, each letter typed send a request to the database, which is a waste of resources, especially for thousands of users. Rather we use the debouncing technique - limiting the rate at which a function can fire.

Lastly, I added pagination by using the searchparams and pathname and other functions to allow the user to type a search query, and then numbers appear at the bottom, allowing the user to scroll from one page to the next to see their results

### Chapter 12 - Mutating Data

Mutating data needs to be done on the server side, not the client. In this case we add server actions to grab the data submitted to a form and then perform type checking and validation to ensure that the data returned is of the expected type. For validation, we use a library called Zod

So we can update data and then redirect the user to the page where they can view all  the invoices including the updated one. Updated invoices and learnt how to use Server Actons to update data

### Chapter 13 - Handling Errors