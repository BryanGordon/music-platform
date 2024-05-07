export function Greetings () {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  let greeting = ""

  if (currentHour < 12) {
    greeting = " Good morning"
  } else if (currentHour < 18) {
    greeting = "Good evening"
  } else {
    greeting = "Good night"
  }
  
  return (
    <h1 className="text-3xl font-bold">
      {greeting}
    </h1>
  )
}
