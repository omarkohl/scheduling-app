"use client";

import { useContext } from "react";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

import { UserContext } from "@/app/context";
import { Proposal } from "@/app/[eventSlug]/proposal";
import type { Guest } from "@/db/guests";
import type { SessionProposal } from "@/db/sessionProposals";

export function ViewProposal(props: {
  proposal: SessionProposal;
  guests: Guest[];
  eventSlug: string;
}) {
  const { proposal, guests, eventSlug } = props;
  const { user: currentUserId } = useContext(UserContext);
  const canEdit = () => {
    if (proposal.hosts.length === 0) {
      return true;
    } else {
      return currentUserId && proposal.hosts.includes(currentUserId);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-24">
      <Proposal proposal={proposal} guests={guests} />
      {canEdit() && (
        <>
          <Link
            href={`/${eventSlug}/proposals/${proposal.id}/edit`}
            className="text-rose-400 hover:text-rose-500 inline-flex items-center"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </Link>
          <div className="ml-4 relative inline-block group">
            <Link
              href=""
              className="opacity-60 group-hover:opacity-80 text-rose-400 hover:text-rose-500 inline-flex items-center pointer-events-none"
            >
              Schedule
            </Link>
            <div className="absolute bottom-3/4 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Scheduling will be enabled on August 17th
            </div>
          </div>
        </>
      )}
      <p className="mt-6">
        <div className="relative inline-block group">
          <button
            type="button"
            className="opacity-50 group-hover:opacity-60 ml-4 rounded-md border border-black shadow-sm  px-6 py-2 bg-white font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            ❤️ Interested
          </button>
          <div className="absolute bottom-3/4 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Voting will be enabled on August 10th
          </div>
        </div>
        <div className="relative inline-block group">
          <button
            type="button"
            className="opacity-50 group-hover:opacity-60 ml-4 rounded-md border border-black shadow-sm  px-6 py-2 bg-white font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            ⭐ Maybe
          </button>
          <div className="absolute bottom-3/4 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Voting will be enabled on August 10th
          </div>
        </div>
        <div className="relative inline-block group">
          <button
            type="button"
            className="opacity-50 group-hover:opacity-60 ml-4 rounded-md border border-black shadow-sm px-6 py-2 bg-white font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            👋🏽 Skip
          </button>
          <div className="absolute bottom-3/4 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Voting will be enabled on August 10th
          </div>
        </div>
      </p>
    </div>
  );
}
