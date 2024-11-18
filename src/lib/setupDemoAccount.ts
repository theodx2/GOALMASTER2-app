import { supabase, demoAdmin, demoGoals } from './supabase';

export async function setupDemoAccount() {
  try {
    // Create demo user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: demoAdmin.email,
      password: demoAdmin.password
    });

    if (authError) throw authError;

    // Create goals table if it doesn't exist
    const { error: tableError } = await supabase.rpc('create_goals_table');
    if (tableError && !tableError.message.includes('already exists')) throw tableError;

    // Insert demo goals
    const { error: goalsError } = await supabase
      .from('goals')
      .insert(demoGoals.map(goal => ({
        ...goal,
        user_id: authData.user?.id
      })));

    if (goalsError) throw goalsError;

    return { success: true };
  } catch (error) {
    console.error('Error setting up demo account:', error);
    return { success: false, error };
  }
}