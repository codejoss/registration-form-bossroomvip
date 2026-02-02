import supabase from "../services/supabase";

function TestGet() {
  return <div>
    {const data = await supabase.from('members').select('*');
    
    
    }
  </div>;
}

export default TestGet;
