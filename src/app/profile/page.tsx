"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ProfilePage = () => {
  const { user } = useUser();
  const plans = useQuery(
    api.plan.getUserPlans,
    user?.id ? { userId: user.id } : "skip"
  );

  return (
    <div className="container mx-auto max-w-5xl px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-2 font-mono">
        Your <span className="text-primary">Profile</span>
      </h1>
      <p className="text-muted-foreground mb-8">
        Review your generated workout and nutrition plans.
      </p>

      {!user && (
        <Card>
          <CardContent className="pt-6">
            <p>Please sign in to view your plans.</p>
          </CardContent>
        </Card>
      )}

      {user && plans === undefined && (
        <Card>
          <CardContent className="pt-6">
            <p>Loading your plans...</p>
          </CardContent>
        </Card>
      )}

      {user && plans && plans.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p>
              No plans found yet. Go to Generate Program to create your first
              one.
            </p>
          </CardContent>
        </Card>
      )}

      {user && plans && plans.length > 0 && (
        <div className="space-y-6">
          {plans.map((plan) => (
            <Card key={plan._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      plan.isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {plan.isActive ? "Active" : "Archived"}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Workout Schedule</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {plan.workoutPlan.schedule.map((day) => (
                      <span
                        key={`${plan._id}-${day}`}
                        className="text-xs bg-secondary/30 px-2 py-1 rounded"
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {plan.workoutPlan.exercises.map((exercise) => (
                      <div
                        key={`${plan._id}-${exercise.day}`}
                        className="border border-border rounded-md p-3"
                      >
                        <p className="font-medium mb-2">{exercise.day}</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {exercise.routines.map((routine) => (
                            <li key={`${exercise.day}-${routine.name}`}>
                              {routine.name}
                              {routine.sets && routine.reps
                                ? ` - ${routine.sets} sets x ${routine.reps} reps`
                                : ""}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Diet Plan</h3>
                  <p className="text-sm mb-3">
                    Daily Calories:{" "}
                    <span className="text-primary font-semibold">
                      {plan.dietPlan.dailyCalories}
                    </span>
                  </p>
                  <div className="space-y-3">
                    {plan.dietPlan.meals.map((meal) => (
                      <div
                        key={`${plan._id}-${meal.name}`}
                        className="border border-border rounded-md p-3"
                      >
                        <p className="font-medium mb-1">{meal.name}</p>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {meal.foods.map((food) => (
                            <li key={`${meal.name}-${food}`}>{food}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
