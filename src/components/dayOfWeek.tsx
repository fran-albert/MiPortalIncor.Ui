import React from "react";

function DayOfWeek() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [weekday, date] = formattedDate.split(", ").map((part) => part.trim());

  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  const dateParts = date.split(" de ");
  const capitalizedMonth =
    dateParts[1].charAt(0).toUpperCase() + dateParts[1].slice(1);

  const capitalizedDate = `${dateParts[0]} de ${capitalizedMonth} de ${dateParts[2]}`;

  return (
    <div>
      <h2>
        {capitalizedWeekday}, {capitalizedDate}
      </h2>
    </div>
  );
}

export default DayOfWeek;
