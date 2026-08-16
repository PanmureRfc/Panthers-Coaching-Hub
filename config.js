/* Fill these in to share sessions and diagrams between all coaches.
   Leave them empty and the app still works, but each coach only sees
   what they saved on their own device.

   Both values are safe to put in a public repo — the anon key is designed
   to be public, and the table rules below decide what it can actually do. */

window.PANTHERS_CONFIG = {
  supabaseUrl: "",   // e.g. https://abcdefgh.supabase.co
  supabaseKey: ""    // Project Settings > API > anon public key
};
