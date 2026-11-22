"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Eye,
  EyeOff,
  Plus,
  Route as RouteIcon,
  Save,
  Trash2,
} from "lucide-react";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { TeacherCreatorForm } from "@/components/teacher/TeacherCreatorForm";
import { useApp } from "@/context/AppProvider";
import { ROADMAP_LEVELS } from "@/data/roadmap";
import type { Exercise } from "@/types/exercise";
import type { RoadmapLevelId } from "@/types/roadmap";
import { getRouteProgress } from "@/lib/teacherRoutes";
import { cn } from "@/lib/utils";

export function TeacherRouteBuilder() {
  const {
    activeProfile,
    exercises,
    progress,
    getExercise,
    getUnitForExercise,
    teacherRoutes,
    createTeacherRoute,
    updateTeacherRoute,
    addExerciseToTeacherRoute,
    removeExerciseFromTeacherRoute,
    reorderTeacherRouteExercises,
    publishTeacherRoute,
    unpublishTeacherRoute,
    deleteTeacherRoute,
    addExercise,
  } = useApp();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLevel, setNewLevel] = useState<RoadmapLevelId>("N1");
  const [activityToAdd, setActivityToAdd] = useState("");
  const [message, setMessage] = useState("");

  if (!activeProfile || activeProfile.role !== "teacher") {
    return null;
  }

  const myRoutes = teacherRoutes.filter(
    (route) => route.ownerId === activeProfile.id,
  );
  const route =
    myRoutes.find((item) => item.id === selectedRouteId) ?? myRoutes[0];
  const routeExercises = route
    ? route.exerciseIds.flatMap((id) => {
        const exercise = getExercise(id);
        return exercise ? [exercise] : [];
      })
    : [];
  const routeProgress = route ? getRouteProgress(route, progress) : null;
  const availableExercises = exercises.filter(
    (exercise) => !route?.exerciseIds.includes(exercise.id),
  );

  const handleCreateRoute = () => {
    setMessage("");
    const result = createTeacherRoute({
      title: newTitle,
      description: newDescription,
      levelId: newLevel,
    });
    if (!result.ok) {
      setMessage(result.error ?? "No pudimos crear la ruta.");
      return;
    }
    setSelectedRouteId(result.routeId ?? null);
    setNewTitle("");
    setNewDescription("");
    setMessage("Ruta creada como borrador.");
  };

  const handleAddExisting = () => {
    if (!route || !activityToAdd) return;
    addExerciseToTeacherRoute(route.id, activityToAdd);
    setActivityToAdd("");
    setMessage("Actividad agregada a la ruta.");
  };

  const handleNewActivity = (exercise: Exercise) => {
    if (!route) return;
    addExercise(exercise);
    addExerciseToTeacherRoute(route.id, exercise.id);
    setMessage("Actividad nueva agregada a la ruta.");
  };

  const move = (index: number, direction: -1 | 1) => {
    if (!route) return;
    const next = [...route.exerciseIds];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    reorderTeacherRouteExercises(route.id, next);
  };

  const handlePublish = () => {
    if (!route) return;
    if (route.status === "published") {
      unpublishTeacherRoute(route.id);
      setMessage("Ruta guardada como borrador.");
      return;
    }
    const result = publishTeacherRoute(route.id);
    setMessage(result.ok ? "Ruta publicada para la clase." : result.error ?? "No pudimos publicar.");
  };

  return (
    <div className="mt-6 space-y-6">
      <PaperCard className="p-5">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
          <RouteIcon className="size-5 text-teal" aria-hidden="true" />
          Crear una ruta para mi clase
        </h2>
        <p className="mt-1 text-sm font-semibold text-ink-soft">
          Elige un nivel y arma una secuencia de actividades. Puedes usar
          actividades existentes o crear una nueva con plantilla.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="route-title" className="text-sm font-black text-ink">
              Título de la nueva ruta
            </label>
            <input
              id="route-title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Ej. Repaso antes del examen"
              className="mt-1 h-11 w-full rounded-xl border-2 border-ink bg-paper px-3 font-bold text-ink focus:border-sky focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="route-level" className="text-sm font-black text-ink">
              Nivel
            </label>
            <select
              id="route-level"
              value={newLevel}
              onChange={(event) => setNewLevel(event.target.value as RoadmapLevelId)}
              className="mt-1 h-11 w-full rounded-xl border-2 border-ink bg-paper px-3 font-bold text-ink focus:border-sky focus:outline-none"
            >
              {ROADMAP_LEVELS.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.id} · {level.title}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="route-description" className="text-sm font-black text-ink">
              Descripción
            </label>
            <textarea
              id="route-description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              rows={2}
              placeholder="¿Para qué sirve esta ruta?"
              className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 font-semibold text-ink focus:border-sky focus:outline-none"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleCreateRoute}
          className="mt-3 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
        >
          <Plus className="size-4" aria-hidden="true" />
          Crear ruta
        </button>
        {message && (
          <p className="mt-3 rounded-xl border-2 border-ink/20 bg-paper-deep/40 p-2 text-sm font-bold text-ink">
            {message}
          </p>
        )}
      </PaperCard>

      {myRoutes.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {myRoutes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedRouteId(item.id)}
              className={cn(
                "rounded-xl border-2 px-3 py-2 text-sm font-black",
                item.id === route?.id
                  ? "border-ink bg-mustard text-ink shadow-hard"
                  : "border-ink/20 bg-paper text-ink-soft",
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {route && (
        <PaperCard className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Sticker tone={route.status === "published" ? "teal" : "paper"}>
                  {route.status === "published" ? "Publicada" : "Borrador"}
                </Sticker>
                <span className="rounded-full border-2 border-ink/20 bg-paper-deep px-2 py-0.5 text-xs font-black text-ink-soft">
                  {route.levelId}
                </span>
              </div>
              <input
                value={route.title}
                onChange={(event) =>
                  updateTeacherRoute(route.id, { title: event.target.value })
                }
                aria-label="Editar título de la ruta"
                className="mt-2 w-full border-0 bg-transparent font-display text-2xl font-semibold text-ink focus:outline-none"
              />
              <textarea
                value={route.description}
                onChange={(event) =>
                  updateTeacherRoute(route.id, { description: event.target.value })
                }
                aria-label="Editar descripción de la ruta"
                rows={2}
                className="mt-1 w-full rounded-lg border-2 border-transparent bg-transparent py-1 text-sm font-semibold text-ink-soft focus:border-sky focus:bg-paper focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handlePublish}
                className="flex items-center gap-1 rounded-xl border-2 border-ink bg-teal px-3 py-2 text-xs font-black text-paper shadow-hard"
              >
                {route.status === "published" ? (
                  <EyeOff className="size-3.5" aria-hidden="true" />
                ) : (
                  <Eye className="size-3.5" aria-hidden="true" />
                )}
                {route.status === "published" ? "Volver a borrador" : "Publicar ruta"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("¿Eliminar esta ruta?")) {
                    deleteTeacherRoute(route.id);
                    setSelectedRouteId(null);
                  }
                }}
                className="flex items-center gap-1 rounded-xl border-2 border-ink bg-paper px-3 py-2 text-xs font-black text-coral-deep"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                Eliminar
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-black text-ink-soft">
              <span>{routeExercises.length} actividades</span>
              <span>{routeProgress?.solved ?? 0} completadas</span>
            </div>
            <div className="mt-1 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-paper-deep">
              <div
                className="h-full bg-teal"
                style={{ width: `${routeProgress?.percent ?? 0}%` }}
              />
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {routeExercises.map((exercise, index) => (
              <li
                key={exercise.id}
                className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-ink/20 bg-paper-deep/40 p-3"
              >
                <span className="flex size-7 items-center justify-center rounded-full border-2 border-ink bg-paper text-xs font-black text-ink">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink">{exercise.titulo}</p>
                  <p className="text-xs font-semibold text-ink-soft">
                    {exercise.categoria} · {exercise.levelId ?? "N1"}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Subir ${exercise.titulo}`}
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="rounded-lg border-2 border-ink bg-paper p-1.5 text-ink disabled:opacity-30"
                >
                  <ArrowUp className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Bajar ${exercise.titulo}`}
                  onClick={() => move(index, 1)}
                  disabled={index === routeExercises.length - 1}
                  className="rounded-lg border-2 border-ink bg-paper p-1.5 text-ink disabled:opacity-30"
                >
                  <ArrowDown className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => removeExerciseFromTeacherRoute(route.id, exercise.id)}
                  className="rounded-lg border-2 border-ink bg-paper px-2 py-1 text-xs font-black text-coral-deep"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border-2 border-ink/20 bg-paper p-3">
              <p className="text-sm font-black text-ink">Agregar actividad existente</p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <select
                  value={activityToAdd}
                  onChange={(event) => setActivityToAdd(event.target.value)}
                  aria-label="Actividad existente"
                  className="h-11 flex-1 rounded-xl border-2 border-ink bg-paper px-2 text-sm font-semibold text-ink focus:border-sky focus:outline-none"
                >
                  <option value="">Elige una actividad</option>
                  {availableExercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {(exercise.levelId ?? getUnitForExercise(exercise.id)?.levelId ?? "N1")} · {exercise.titulo}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddExisting}
                  disabled={!activityToAdd}
                  className="flex items-center justify-center gap-1 rounded-xl border-2 border-ink bg-mustard px-3 py-2 text-sm font-black text-ink disabled:opacity-40"
                >
                  <Plus className="size-4" aria-hidden="true" />
                  Agregar
                </button>
              </div>
            </div>

            <details className="rounded-xl border-2 border-ink/20 bg-paper p-3">
              <summary className="cursor-pointer text-sm font-black text-ink">
                Crear una actividad nueva
              </summary>
              <div className="mt-3">
                <TeacherCreatorForm
                  embedded
                  context="route"
                  onCreated={handleNewActivity}
                />
              </div>
            </details>
          </div>

          {route.status === "published" && (
            <p className="mt-4 flex items-center gap-1 rounded-xl border-2 border-teal bg-[#cce9e3] p-3 text-sm font-bold text-ink">
              <Check className="size-4" aria-hidden="true" />
              Esta ruta aparece en “Rutas de mi clase” para tus estudiantes.
            </p>
          )}
        </PaperCard>
      )}

      {myRoutes.length === 0 && (
        <PaperCard className="p-6 text-center">
          <Save className="mx-auto size-8 text-mustard" aria-hidden="true" />
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            Todavía no tienes rutas
          </p>
          <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
            crea una arriba y agrega tus primeras actividades
          </p>
        </PaperCard>
      )}
    </div>
  );
}
