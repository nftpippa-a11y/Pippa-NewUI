"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: "active" | "passed" | "pending";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  endDate: string;
  category: string;
}

const proposals: Proposal[] = [
  {
    id: 1,
    title: "Launch PIPPA Merchandise Line",
    description: "Proposal to expand our merchandise offerings with new t-shirts, hoodies, and accessories featuring exclusive PIPPA artwork.",
    status: "active",
    votesFor: 847,
    votesAgainst: 123,
    totalVotes: 970,
    endDate: "3 days left",
    category: "Treasury",
  },
  {
    id: 2,
    title: "Community Event Sponsorship",
    description: "Allocate 50 ETH from treasury to sponsor a community meetup in New York City with food, venue, and entertainment.",
    status: "active",
    votesFor: 654,
    votesAgainst: 298,
    totalVotes: 952,
    endDate: "5 days left",
    category: "Community",
  },
  {
    id: 3,
    title: "Partnership with NFT Marketplace",
    description: "Establish an official partnership with a major NFT marketplace for exclusive PIPPA drops and featured collections.",
    status: "passed",
    votesFor: 1203,
    votesAgainst: 87,
    totalVotes: 1290,
    endDate: "Ended",
    category: "Partnership",
  },
  {
    id: 4,
    title: "New Character Design Contest",
    description: "Host a community design contest where holders can submit new pie character designs. Winner gets 5 ETH and their design minted.",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    endDate: "Starts in 2 days",
    category: "Creative",
  },
];

export function DaoSection() {
  const [userVotes, setUserVotes] = useState<{ [key: number]: "for" | "against" | null }>({});

  const handleVote = (proposalId: number, vote: "for" | "against") => {
    setUserVotes((prev) => ({ ...prev, [proposalId]: vote }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground";
      case "passed":
        return "bg-secondary text-secondary-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Vote className="w-4 h-4" />;
      case "passed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <section id="dao" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              PIPPA DAO Governance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Shape the future of PIPPA! NFT holders can vote on proposals and make important decisions for the community.
            </p>
          </div>

          {/* DAO Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,523</div>
              <div className="text-sm text-muted-foreground">Total Holders</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">24</div>
              <div className="text-sm text-muted-foreground">Proposals Passed</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-accent-foreground mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Avg. Participation</div>
            </Card>
          </div>

          {/* Proposals */}
          <div className="space-y-6">
            {proposals.map((proposal) => {
              const forPercentage =
                proposal.totalVotes > 0
                  ? (proposal.votesFor / proposal.totalVotes) * 100
                  : 0;
              const userVote = userVotes[proposal.id];

              return (
                <Card key={proposal.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getStatusColor(proposal.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(proposal.status)}
                            {proposal.status.toUpperCase()}
                          </span>
                        </Badge>
                        <Badge variant="outline">{proposal.category}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground">
                        {proposal.title}
                      </h3>
                      <p className="text-muted-foreground text-pretty">
                        {proposal.description}
                      </p>
                    </div>
                  </div>

                  {/* Voting Stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {proposal.totalVotes.toLocaleString()} votes cast
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {proposal.endDate}
                      </span>
                    </div>

                    {proposal.totalVotes > 0 && (
                      <>
                        <Progress value={forPercentage} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-primary font-medium">
                            For: {proposal.votesFor.toLocaleString()} ({Math.round(forPercentage)}%)
                          </span>
                          <span className="text-muted-foreground font-medium">
                            Against: {proposal.votesAgainst.toLocaleString()} (
                            {Math.round(100 - forPercentage)}%)
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Voting Buttons */}
                  {proposal.status === "active" && (
                    <div className="flex gap-3 pt-2">
                      <Button
                        className="flex-1"
                        variant={userVote === "for" ? "default" : "outline"}
                        onClick={() => handleVote(proposal.id, "for")}
                        disabled={userVote !== null}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Vote For
                      </Button>
                      <Button
                        className="flex-1"
                        variant={userVote === "against" ? "destructive" : "outline"}
                        onClick={() => handleVote(proposal.id, "against")}
                        disabled={userVote !== null}
                      >
                        Vote Against
                      </Button>
                    </div>
                  )}

                  {userVote && proposal.status === "active" && (
                    <div className="bg-accent/20 text-accent-foreground p-3 rounded-lg text-sm text-center">
                      Vote recorded! Your voice has been heard.
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Create Proposal CTA */}
          <Card className="mt-12 p-6 md:p-8 bg-primary text-primary-foreground text-center space-y-4">
            <div className="flex justify-center">
              <TrendingUp className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold">Have an idea?</h3>
            <p className="max-w-2xl mx-auto opacity-90 text-pretty">
              PIPPA holders with 10+ NFTs can submit new proposals. Help shape the future of our community!
            </p>
            <Button size="lg" variant="secondary">
              Create Proposal
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
